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
      2. remove: if they want to remove specific items. Provide the items array with names to remove.
      3. clear: if they want to empty or clear their entire cart/list.
      4. search: if they want to find, filter, or look for items. Provide the 'searchTerm'.
      5. stop: if they answer "no", "that's it", "nothing else", "stop", or indicate they do not want to add anything else.
      6. unknown: if the intent is not recognized.
      
      When adding/removing/searching, ALWAYS provide a 'message' field that contains a friendly, conversational response summarizing the action, AND ALWAYS end your message by asking if they want to add or do anything else (e.g., "I've added 2 apples. Do you need anything else?"). 
      If the action is 'stop', your message should be a friendly sign-off (e.g., "Okay, let me know if you need anything else!").
      
      Return ONLY a valid JSON object with the following structure:
      {
        "action": "add" | "remove" | "clear" | "search" | "stop" | "unknown",
        "items": [
          { "name": "string", "quantity": number, "category": "string" }
        ],
        "searchTerm": "string (optional)",
        "message": "string (conversational spoken response)"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON block in case Gemini adds markdown or conversational text
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      console.error("No JSON found in response:", text);
      throw new Error("Failed to parse JSON");
    }
    
    const parsedData = JSON.parse(match[0]);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error parsing command:', error);
    return NextResponse.json(
      { error: 'Failed to process command' },
      { status: 500 }
    );
  }
}
