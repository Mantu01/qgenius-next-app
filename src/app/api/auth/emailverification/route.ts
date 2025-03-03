import prisma from "@/DB/dbConfig";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
  try {
    const { token } =await req.json();
    const user = await prisma.user.findFirst({
      where: {
       AND:[
        {verifyToken:token},
        {verifyTokenExpiry:{gt:new Date()}}
       ] 
      },
    });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified:true,
        verifyToken: null,
        verifyTokenExpiry:null
      },
    });
    return NextResponse.json({message:"Email verified successful",data:user},{status: 200});
  } catch (error) {
    console.error("Error verifying email :: Error :: ",error);
    return NextResponse.json({ message: "Server error while verifying email" },{status:500});
  }
}