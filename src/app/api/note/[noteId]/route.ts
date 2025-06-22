import prisma from "@/config/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }: { params: { noteId: string }}) {
  try {
    const userId=await getDataFromToken(req);
    if(!userId){
      return NextResponse.json({message:'Unautherize'},{status:401});
    }
    const {noteId}=await params;
    const chat=await prisma.note.findFirst({
      where:{id:noteId},
      include:{contenets:true}
    })
    return NextResponse.json(chat,{status:200})
  } catch (error:any) {
    return NextResponse.json({ message:'Internal Server Error' ,error:error.message},{ status: 500 });
  }
}