import prisma from "@/config/dbConfig";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {email,userName,password} =await req.json();
    if(!userName && !email){
      return NextResponse.json({ message: "Please provide email or username", },{ status: 400 });
    }
    const user = await prisma.user.findFirst({ where:{OR:[{email},{userName}]} });
    if (!user) {
      return NextResponse.json({ message: "User not found", },{ status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid password", },{ status: 401 });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    const response = NextResponse.json({message: "Login successful",userId: user.id,});
    response.cookies.set("token",token,{
      httpOnly: true,
    })
    return response;
  } catch (error) {
    console.error("Error in login :: Error : ", error);
    return NextResponse.json({ message: "Severe error while login", error },{ status: 500 });
  }
}