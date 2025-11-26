import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const { goal, audience, productContext } = await request.json();

    if (!goal) {
      return NextResponse.json(
        { error: "Message goal is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        {
          error:
            "API Configuration Error: Gemini API key is missing. Please add GEMINI_API_KEY to your .env.local file.",
        },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create a detailed prompt for generating messages
    const prompt = `You are a professional marketing message writer for small businesses in Nigeria. Generate 2 engaging marketing messages based on the following:

Goal: ${goal}
${audience ? `Target Audience: ${audience}` : ""}
${productContext ? `Product/Service: ${productContext}` : ""}

Generate:
1. A WhatsApp message (friendly, conversational tone with emojis)
2. An Instagram caption (casual, engaging with hashtags)

For each message, provide:
- A catchy title
- The complete message text
- The tone (Friendly/Professional/Casual)

Format your response as a JSON array with this structure:
[
  {
    "title": "message title",
    "message": "the actual message text",
    "tone": "Friendly/Professional/Casual",
    "platform": "WhatsApp/Instagram"
  }
]

Keep messages concise, engaging, and culturally appropriate for Nigerian businesses. Use relevant emojis and make them actionable.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to extract JSON from the response
    let messages;
    try {
      // Remove markdown code blocks if present
      const jsonText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
      messages = JSON.parse(jsonText);
    } catch (parseError) {
      // If parsing fails, create a fallback response
      console.error("Failed to parse AI response:", parseError);
      messages = [
        {
          title: "AI Generated Message",
          message: text,
          tone: "Friendly",
          platform: "WhatsApp",
        },
      ];
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error generating messages:", error);
    return NextResponse.json(
      { error: "Failed to generate messages" },
      { status: 500 }
    );
  }
}
