import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getCivicResponse(prompt: string, context?: string) {
  const model = "gemini-3-flash-preview";
  const systemInstruction = `
    You are the Bengaluru Civic Navigator assistant. 
    You help citizens with queries regarding BBMP (Municipal), BESCOM (Electricity), BWSSB (Water), RERA, traffic, and other government services.
    
    Context provided: ${context || "No specific context provided."}
    
    Guidelines:
    - Provide step-by-step guidance.
    - Be polite and professional.
    - Support both English and Kannada. If the user asks in Kannada, reply in Kannada.
    - If you don't know the answer, suggest contacting the specific department helpline (e.g., BBMP 1533).
    - Summarize documents if provided in context.
    - Categorize complaints if asked.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I encountered an error processing your request. Please try again later.";
  }
}
