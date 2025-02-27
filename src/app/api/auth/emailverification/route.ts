import prisma from "@/DB/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req:NextRequest){
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const users = await prisma.user.findFirst({
      where: {
        verifyToken:token,
      },
    });
    if (!users) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    await prisma.user.update({
      where: {
        id: users.id,
      },
      data: {
        verifyToken: null,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error verifying email :: Error :: ",error);
    return NextResponse.json({ message: "Server error while verifying email" },{status:500});
  }
}