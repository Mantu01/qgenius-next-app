import prisma from "@/config/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helper/mail/mailer";
import { getDataFromToken } from "@/helper/getDataFromToken";
// get -> get forgot password mail
// post -> authenticate mail and reset password
// put -> update password/email


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

export async function PUT(req:NextRequest){
  try {
    const userId = getDataFromToken(req);
    if(!userId){
      return NextResponse.json({message:"Invalid Token"},{status:401});
    }
    const {type,password,newPassword,email}=await req.json();
    const user=await prisma.user.findFirst({
      where:{id:userId}
    });
    if(!user){
      return NextResponse.json({message:"User not found"},{status:404});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid current Password", },{ status: 401 });
    }
    if(type==='email'){
      const existingUser=await prisma.user.findFirst({
        where:{email}
      });
      if(existingUser){
        return NextResponse.json({message:"User with this email already exist"},{status:409});
      }
      const updatedUser=await prisma.user.update({
        where:{id:userId},
        data:{email,isVerified:false},
        omit:{password:true,verifyToken:true,verifyTokenExpiry:true,forgotPasswordToken:true,forgotPasswordTokenExpiry:true}
      });
      sendEmail({email,emailType:"VERIFY",userId});
      return NextResponse.json({message:'User updated successfully and verification mail is sent to the new email',user:updatedUser},{status:200});
    }else if(type==='password'){
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      const updatedUser=await prisma.user.update({
        where:{id:userId},
        data:{password:hashedPassword}
      });
      return NextResponse.json({message:"Password updated successfully",user:updatedUser},{status:200});
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}