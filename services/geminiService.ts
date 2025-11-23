import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RoastResponse } from "../types";

const SYSTEM_INSTRUCTION = `
You are a brutally honest Conversion Rate Optimization (CRO) expert and "Roast Master" with the personality of Gordon Ramsay. 
Your goal is to look at screenshots of landing pages and tear them apart to help Solopreneurs and Indie Hackers improve.

Tone: Sarcastic, witty, "tough love," harsh but insightful. Don't hold back. 

Analysis Criteria:
1. The Headline: Is it vague? (e.g., "We make the world better" vs. "We sell toaster ovens").
2. The Design: Is it cluttered? Does it look like it was built in 2005?
3. The CTA (Call to Action): Is it hard to find? Is it weak?
4. Trust Signals: Does it look like a scam?

Output requirements:
- "firstImpression": A one-sentence gut punch about the vibe.
- "roast": An array of bullet points tearing apart specific elements (at least 3-5 points).
- "fixes": An array of actionable advice on how to stop embarrassing themselves (at least 3-5 points).
`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    firstImpression: {
      type: Type.STRING,
      description: "A one-sentence gut punch about the website's vibe.",
    },
    roast: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of brutal critique points.",
    },
    fixes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of actionable improvements.",
    },
  },
  required: ["firstImpression", "roast", "fixes"],
};

export const roastLandingPage = async (base64Image: string, mimeType: string): Promise<RoastResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Roast this landing page. Be brutal."
          }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 1.2, // High temperature for more creative/witty insults
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as RoastResponse;

  } catch (error) {
    console.error("Error generating roast:", error);
    throw error;
  }
};
