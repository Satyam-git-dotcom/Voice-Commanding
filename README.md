# Voice Command Shopping Assistant

A voice-based shopping list manager with smart suggestions, built for a technical assessment.

## Features

- 🎙 **Voice Input**: Uses the Web Speech API to capture voice commands (e.g. "Add milk and 2 apples").
- 🧠 **Natural Language Processing**: Integrates with Google's Gemini API to parse intents, extract items, quantities, and categories.
- 💡 **Smart Suggestions**: Analyzes your current list and suggests logical additions (also powered by Gemini).
- 📱 **Minimalist UI**: Mobile-first, glassmorphism design with clear visual feedback during voice processing.

## Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Styling**: Tailwind CSS v4, Framer Motion for animations
- **Icons**: Lucide React
- **AI/NLP**: Google Gemini API (@google/generative-ai)

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   *(Note: The app has a mock fallback if no API key is provided, so it will still run without it for basic testing).*
4. Start the development server:
   ```bash
   npm run dev
   ```

## Brief Approach Write-up

I chose Next.js for its seamless integration of frontend UI and backend API routes, allowing me to securely use the Gemini API without exposing the key on the client. For the UI, I focused on a minimalist, mobile-first design using Tailwind CSS, implementing a prominent central microphone button with clear visual feedback (pulsing animations and transcription text) to optimize for voice-only interaction. 

To solve the NLP challenge, I utilized Google's Gemini Flash model via Next.js API routes. When a user speaks, the Web Speech API transcribes it. The transcription is sent to the backend where Gemini is prompted to extract the action (add/remove), entities (items, quantities), and automatically categorize them. A similar approach powers the Smart Suggestions feature, which contextualizes the user's current list to recommend complimentary items. State management is handled via React Context and persisted in LocalStorage for simplicity and speed.
