import prisma from "@/config/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }: { params: { chatId: string }}) {
  try {
    const userId=await getDataFromToken(req);
    if(!userId){
      return NextResponse.json({message:'Unautherize'},{status:401});
    }
    const {chatId}=params;
    const chat=await prisma.chat.findFirst({
      where:{id:chatId},
      include:{messages:true}
    })
    return NextResponse.json(chat,{status:200})
  } catch (error:any) {
    return NextResponse.json({ message:'Internal Server Error' ,error:error.message},{ status: 500 });
  }
}