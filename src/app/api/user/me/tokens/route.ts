import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/DB/dbConfig";

export async function GET(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    const tokens = await prisma.aPIsTokens.findFirst({ where: { userId } });
    if (!tokens) {
      return NextResponse.json({ message: "No apis found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Apis found", data: tokens }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    const { gemini, openAi, anthropic, grok } = await req.json();
    const existingTokens = await prisma.aPIsTokens.findFirst({where: { userId },});
    let updatedTokens;
    if (existingTokens) {
      updatedTokens = await prisma.aPIsTokens.update({
        where: { userId },
        data: { gemini, openAi, anthropic, grok },
      });
    } else {
      updatedTokens = await prisma.aPIsTokens.create({
        data: { userId, gemini, openAi, anthropic, grok },
      });
    }
    return NextResponse.json({ message: existingTokens ? "APIs updated" : "APIs created", data: updatedTokens },{ status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    const tokens = await prisma.aPIsTokens.delete({ where: { userId } });
    return NextResponse.json({ message: "Apis deleted", data: tokens }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}

// GET -> Get all apis of logged in user
// POST -> update apis of logged in user
// DELETE -> delete apis of logged in user