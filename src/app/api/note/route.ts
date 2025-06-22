import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import geminiAiStream, { geminiNoteAi } from "@/helper/ai/gemini";


// GET -> Get all notes
// POST -> Create note


export async function GET(req:NextRequest) {
  try {
    const userId=await getDataFromToken(req);
    if(!userId){
      return Response.json({message:'Unautherize'},{status:401});
    }
    const allNotes=await prisma.note.findMany({
      where:{userId},
    });
    return Response.json({Notes:allNotes},{status:200});
  } catch (error:any) {
    return NextResponse.json({ message:'Internal Server Error' ,error:error.message},{ status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { chatId: string } }) {
  try {
    const { questions,topic } = await req.json();
    if(!questions || !questions.length){
      return Response.json({message:'Questions are required'},{status:404});
    }

    const userId=await getDataFromToken(req);
    if(!userId){
      return Response.json({message:'Unautherize'},{status:401});
    }

    const note=await prisma.note.create({
      data:{
        topic,
        userId,
      }
    });

    let data=[];
    for(const ele of questions){
      const answer=await geminiNoteAi(ele.question,ele.level,topic);
      data.push({
        question:ele.question,
        answer,
        level:ele.level,
        noteId:note.id
      });
    }

    if(data.length<1){
      return NextResponse.json({message:'something went wrong'},{status:500});
    }

    await prisma.qnA.createMany({data});
    return NextResponse.json({message:'success',noteId:note.id},{status:201});
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
