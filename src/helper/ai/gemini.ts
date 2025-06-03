import { prompt } from '@/app/_lib/constants/prompt';
import {GoogleGenAI} from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function geminiAiStream(question:string){
  const instruction=prompt.replace('{USER_QUESTION}',question);
  const response = await ai.models.generateContentStream({
    model: "gemini-1.5-flash",
    contents: instruction,
  });

  return response;

};

export async function geminiAi(question:string) {
  
}