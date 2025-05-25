import {GoogleGenAI} from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function geminiAi(prompt:string){
  const response = await ai.models.generateContentStream({
    model: "gemini-1.5-flash",
    contents: prompt,
  });
};