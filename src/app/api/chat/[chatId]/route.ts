import prisma from "@/config/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import geminiAiStream from "@/helper/ai/gemini";

export async function GET(req:NextRequest) {
  try {
    const userId=await getDataFromToken(req);
    if(!userId){
      return NextResponse.json({message:'Unauthorized'},{status:401});
    }
    const url = new URL(req.url);
    const chatId = url.pathname.split('/').pop();
    const chat=await prisma.chat.findFirst({
      where:{id:chatId},
      include:{messages:true}
    })
    return NextResponse.json(chat,{status:200})
  } catch (error) {
    //@ts-expect-error: unknown
    return NextResponse.json({ message:'Internal Server Error' ,error:error.message},{ status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { question } = await req.json();
    
    const url = new URL(req.url);
    const chatId = url.pathname.split('/').pop();

    if(!chatId){
      return NextResponse.json({message:'chat id required'},{status:404});
    }

    const encoder = new TextEncoder();
    let fullResponse = '';

    let resolveStreamComplete: () => void;
    const streamComplete = new Promise<void>((resolve) => {
      resolveStreamComplete = resolve;
    });

    const AIresponse=await geminiAiStream(question);
    if(!AIresponse){
      return Response.json({message:'Something wnet wrong'},{status:500});
    }
    const stream = new ReadableStream({
      async start(controller) {
        for await(const chunks of AIresponse) {
          const text=chunks.text;
          fullResponse+=text;
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
        resolveStreamComplete();
      },
    });

    // Return the stream immediately
    const response = new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });

    // Save to DB once the stream is completed
    streamComplete.then(async () => {
      await prisma.chatMessage.createMany({
        data: [
          {
            role: 'user',
            content: question,
            chatId: chatId,
          },
          {
            role: 'assistant',
            content: fullResponse.trim(),
            chatId: chatId,
          },
        ],
      });
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      //@ts-expect-error: unknown
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
