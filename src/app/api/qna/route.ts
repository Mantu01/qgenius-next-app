import { NextRequest } from "next/server";
import {GoogleGenAI} from '@google/genai'
import { prompt } from "@/app/_lib/constants/prompt";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export async function POST(req: NextRequest) {
  const {question} = await req.json();

  const instructions=prompt.replace('{USER_QUESTION}',question);
  const response = await ai.models.generateContentStream({
    model: "gemini-1.5-flash",
    contents:instructions,
  });
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await(const chunks of response){
        const text=chunks.text;
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8 ",
      "Cache-Control": "no-cache",
    },
  });
}
