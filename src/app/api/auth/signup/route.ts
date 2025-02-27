import prisma from "@/DB/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/helper/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const { fullName, userName, email, password } = body;
    if (!fullName ||!userName ||!email ||!password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const userExist = await prisma.user.findFirst({
      where: { OR: [{ email }, { userName }] },
    });
    
    if (userExist) {
      return NextResponse.json(
        { message: "User with email/username Alredy exist" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        fullName,
        userName,
        email,
        password: hashedPassword,
      },
    });
    await sendEmail({email,emailType:"VERIFY",userId:newUser.id});
    return NextResponse.json({ message: "User registered successfully", data:newUser },{ status: 201 });
  } catch (error) {
    console.error("Error in signup route:", error);
    return NextResponse.json({ message: "Severe error while signup", error },{ status: 500 });
  }
}
