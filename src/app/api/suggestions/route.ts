import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ suggestions: [] });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        suggestions: [
          { name: "Bread", reason: "Common staple" },
          { name: "Eggs", reason: "Usually bought with milk" }
        ]
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = `
      You are an intelligent shopping assistant. Look at the user's current shopping list and suggest exactly 3 logical items they might have forgotten or that pair well with what they have. Also consider seasonal items.
      
      Current list: ${JSON.stringify(items.map((i: any) => i.name))}
      
      CRITICAL: Do NOT suggest any items that are already on the current list. Always return exactly 3 items.
      
      Return ONLY a valid JSON array of objects with the following structure:
      [
        { "name": "Item Name", "reason": "Short reason why you suggested it (e.g. 'Pairs well with Pasta', 'Seasonal item')" }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonString = text.replace(/```json\n?|\n?```/g, '').trim();
    const suggestions = JSON.parse(jsonString);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}
