import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini client
// Note: In a real environment, ensure process.env.API_KEY is set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateStreamIdeas = async (vibe: string): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 3 creative streaming setups based on the vibe: "${vibe}".
      For each setup, provide a catchy Stream Title, a "Be Right Back" screen text, and a short visual theme description.
      The style should fit a streamer using high-energy, graphic-heavy overlays (Cyberpunk, Asian-Fusion, Tech).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "The main title of the stream" },
              brbMessage: { type: Type.STRING, description: "Text to display when the streamer is away" },
              themeDescription: { type: Type.STRING, description: "A 10-word description of the visual theme" }
            },
            required: ["title", "brbMessage", "themeDescription"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    return [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback data if API key is missing or fails
    return [
      {
        title: "NEON DYNASTY: RANKED CLIMB",
        brbMessage: "RECHARGING CYBERNETICS",
        themeDescription: "Dark neon streets with traditional lanterns."
      },
      {
        title: "DRAGON PROTOCOL // ONLINE",
        brbMessage: "SYSTEM REBOOT IMMINENT",
        themeDescription: "Gold circuitry weaving through ancient scrolls."
      }
    ];
  }
};
