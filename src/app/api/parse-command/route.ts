import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
// Use a fallback key or handle missing key gracefully for the assessment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { command, currentItems } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      // Mock response if no API key is present
      console.warn("No GEMINI_API_KEY found, using mock parsing.");
      return NextResponse.json({
        action: 'add',
        items: [{ name: command.replace(/add |buy |get /i, '').trim(), quantity: 1, category: 'Uncategorized' }],
        message: "Added (Mocked)"
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = `
      You are an intelligent voice shopping assistant parser.
      Analyze the user's voice command and extract the intent.
      
      User command: "${command}"
      
      Current list: ${JSON.stringify(currentItems)}
      
      Extract the action (add, remove, search, or unknown) and the entities (items, quantities, categories).
      Categories should be standard grocery categories (Produce, Dairy, Meat, Pantry, Snacks, Beverages, Household, etc.).
      
      Actions:
      1. add: if they want to add items to their list.
      2. remove: if they want to remove items. Provide the items array with names to remove.
      3. search: if they want to find, filter, or look for items (e.g. "find organic apples", "show me toothpaste under $5"). Provide the 'searchTerm'.
      
      When adding items, if the user mentions a very common or generic item, you MAY optionally suggest an alternative/substitute in the 'message' field (e.g., "Added milk. Want to try Almond Milk instead?").
      
      Return ONLY a valid JSON object with the following structure:
      {
        "action": "add" | "remove" | "search" | "unknown",
        "items": [
          { "name": "string", "quantity": number, "category": "string" }
        ],
        "searchTerm": "string (optional)",
        "message": "string (optional user facing message, use for substitutes)"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting from Gemini response
    const jsonString = text.replace(/```json\n?|\n?```/g, '').trim();
    
    const parsedData = JSON.parse(jsonString);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error parsing command:', error);
    return NextResponse.json(
      { error: 'Failed to process command' },
      { status: 500 }
    );
  }
}
