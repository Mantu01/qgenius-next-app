import { NextRequest, NextResponse } from "next/server";
import { prompt } from "@/app/_lib/constants/prompt";
import geminiAi from "@/helper/ai/gemini";
import prisma from "@/config/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";


// GET -> Get all chats
// POST -> initialize a chat

export async function PUT(req: NextRequest) {
  const { question } = await req.json();

  const instructions = prompt.replace('{USER_QUESTION}', question);

  //const response=geminiAi(instructions);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 1; i <= 10; i++) {
        const fakeText = `Fake chunk ${i}\n`;
        controller.enqueue(encoder.encode(fakeText));
        await new Promise((res) => setTimeout(res, 300)); // Simulate delay
      }

      // Original AI response logic (commented out)
      // for await (const chunks of response) {
      //   const text = chunks.text;
      //   controller.enqueue(encoder.encode(text));
      // }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}

export async function POST(req:NextRequest) {
  try {
    const {question}=await req.json();
    if(!question){
      return Response.json({message:'Prompt is required'},{status:404});
    }
    const userId=await getDataFromToken(req);
    if(!userId){
      return Response.json({message:'User not found'},{status:404});
    }
    const newChat=await prisma.chat.create({
      data:{
        userId,
        messages: {
          create: [
            {
              role: 'user',
              content: 'Hello, how are you?'
            },
            {
              role: 'assistant',
              content: 'I’m great, how can I help you today?'
            }
          ]
        }
      }
    });
    return Response.json({id:newChat.id},{status:201});
  } catch (error:any) {
    console.log(error)
    return NextResponse.json({ message:'Internal Server Error' ,error:error.message},{ status: 500 });
  }
}
