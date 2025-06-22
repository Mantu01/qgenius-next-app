import { prompt } from '@/app/_lib/constants/prompt';
import {GoogleGenAI} from '@google/genai';
import { initialPrompt } from '@/app/_lib/constants/initailPrompt';
import { notePrompt } from '@/app/_lib/constants/notePromt';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function geminiAiStream(question:string){
  try {
    const instruction=prompt.replace('{USER_QUESTION}',question);
    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: instruction,
    });
  
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }

};

export async function geminiAi(question:string) {
  try {
    const instruction=initialPrompt.replace('{USER_QUESTION}',question);
    const response=await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: instruction,
    });
    const generatedText=response.text;
    if(!generatedText){
      return { header:null, content:null };
    }
    const parts:string[]=generatedText?.split("---HEADER_END---");
    let header = parts[0].trim();
    if (header.startsWith('# ')) {
      header = header.substring(2).trim();
    }
    const content = parts[1].trim();

    return { header, content };
  } catch (error) {
    console.log(error);
    return { header:null, content:null };
  }
}

export async function geminiNoteAi(question:string,level:string,topic:string):Promise<string> {
  try {
    const instruction=notePrompt
      .replace('{USER_QUESTION}',question)
      .replace('{QUESTION_TOPIC}',topic)
      .replace('{QUESTION_LEVEL}',level)

    const response=await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: instruction,
    });
    return response.text || 'An error happend';
  } catch (error) {
    console.error(error)
    return 'An error happend';
  }
}