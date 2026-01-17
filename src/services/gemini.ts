import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Initialize safely to prevent crashes if key is missing during dev
const genAI = new GoogleGenerativeAI(API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function getNutritionAdvice(prompt: string, context: string = "") {
  if (!API_KEY) {
    return "Error: No Gemini API Key found. Please check your .env file setup.";
  }

  try {
    const result = await model.generateContent(`
      Context: ${context}
      User Question: ${prompt}
      
      You are an expert personalized nutrition coach. 
      Keep answers concise, encouraging, and actionable. 
      If suggesting meals, ensure they are vegetarian (as per user profile).
    `);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the nutrition brain right now.";
  }
}
