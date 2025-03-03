import prisma from "@/DB/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helper/mailer";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    await sendEmail({ email: user.email,emailType:"RESET",userId});
    return NextResponse.json({ message: "Password reset email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in reset password:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req:NextRequest){
  try {
    const { token,password } = await req.json();
    const user=await prisma.user.findFirst({
      where:{
        AND:[
          {forgotPasswordToken:token},
          {forgotPasswordTokenExpiry:{gt:new Date()}}
        ]
      }
    });
    if(!user){
      return NextResponse.json({ message: "Invalid token or expired" }, { status: 401 });
    }
    const hashedPassword=await bcrypt.hash(password,12);
    await prisma.user.update({
      where:{
        id:user.id
      },
      data:{
        password:hashedPassword,
        forgotPasswordToken:null,
        forgotPasswordTokenExpiry:null
      }
    });
    return NextResponse.json({ message: "Password updated successfully",data:user },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}