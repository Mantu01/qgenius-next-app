import prisma from "@/DB/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { sendEmail } from "@/helper/mail/mailer";

export async function GET(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if(!userId){
      return NextResponse.json({message:"Invalid Token"},{status:401});
    }
    const user=await prisma.user.findFirst({
      where:{id: userId},
      omit:{
        password:true,
        verifyToken:true,
        verifyTokenExpiry:true,
        forgotPasswordToken:true,
        forgotPasswordTokenExpiry:true
      }
    });
    if(!user){
      return NextResponse.json({ message: "User not found", },{ status: 404 });
    }
    return NextResponse.json({ message: "User found",data:user },{status:200});
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ message: error.message},{ status: 500 });
  }
}


// basicInfo={fullName,userName}
// updateEmail={email,password}
// updatePassword={oldPassword,newPassword}
export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if(!userId){
      return NextResponse.json({message:"Invalid Token"},{status:401});
    }
    const {basicInfo,updateEmail,updatePassword}=await req.json();
    let updatedUser;
    if(basicInfo){
      const {fullName,userName}=basicInfo;
      const userExists=await prisma.user.findFirst({where:{userName}});
      if(userName && userExists){
        return NextResponse.json({ message: "Username already exists" },{ status: 400 });
      }
      updatedUser=await prisma.user.update({
        where:{id:userId},
        data:{fullName,userName},
        omit:{password:true,verifyToken:true,verifyTokenExpiry:true,forgotPasswordToken:true,forgotPasswordTokenExpiry:true}
      });
      console.log(updatedUser)
    }else if(updateEmail){
      const {email,password}=updateEmail;
      const userExists=await prisma.user.findFirst({where:{email}});
      if(userExists){
        return NextResponse.json({ message: "Email already registered" },{ status: 400 });
      }
      const user=await prisma.user.findFirst({where:{id:userId}});
      const isPasswordValid=await bcrypt.compare(password,user!.password);
      if(!isPasswordValid){
        return NextResponse.json({ message: "Invalid password", },{ status: 401 });
      }
      updatedUser=await prisma.user.update({
        where:{id:userId},
        data:{email},
        omit:{password:true,verifyToken:true,verifyTokenExpiry:true,forgotPasswordToken:true,forgotPasswordTokenExpiry:true}
      });
      await sendEmail({email:updatedUser.email,emailType:"VERIFY",userId});
    }else if(updatePassword){
      const {oldPassword,newPassword}=updatePassword;
      const user=await prisma.user.findFirst({where:{id:userId}});
      const isPasswordValid=await bcrypt.compare(oldPassword,user!.password);
      if(!isPasswordValid){
        return NextResponse.json({ message: "Invalid password", },{ status: 401 });
      }
      const hashedPassword=await bcrypt.hash(newPassword,10);
      updatedUser=await prisma.user.update({
        where:{id:userId},
        data:{password:hashedPassword},
        omit:{password:true,verifyToken:true,verifyTokenExpiry:true,forgotPasswordToken:true,forgotPasswordTokenExpiry:true}
      });
    }
    if(!updatedUser){
      return NextResponse.json({ message: "User not found" },{ status: 404 });
    }
    return NextResponse.json({ message: "User updated successfully",user:updatedUser },{status:200});
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ message: error.message },{status:500});
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if(!userId){
      return NextResponse.json({message:"Invalid Token"},{status:401});
    }
    await prisma.user.delete({
      where:{id:userId}
    });
    return NextResponse.json({ message: "User deleted successfully" },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}


// GET-> get Details of logged in user
// POST-> Update logged in user
// DELETE-> Delete logged in user