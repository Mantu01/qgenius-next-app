import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { prompt } from "@/app/_lib/constants/prompt";
import geminiAi from "@/helper/ai/gemini";


// GET -> Get all chats
// POST -> initialize a chat

export async function GET(req:NextRequest) {
  try {
    const userId=await getDataFromToken(req);
    if(!userId){
      return Response.json({message:'Unautherize'},{status:401});
    }
    const allChat=await prisma.chat.findMany({
      where:{userId},
      include:{messages:true}
    });
    return Response.json({data:allChat},{status:200});
  } catch (error:any) {
    return NextResponse.json({ message:'Internal Server Error' ,error:error.message},{ status: 500 });
  }
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
    const response=await geminiAi(question)
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
