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
    const { gemini, openAi, claude, grok } = await req.json();
    const updatedTokens = await prisma.aPIsTokens.update({
      where: { userId },
      data: { gemini, openAi, claude, grok },
    });
    return NextResponse.json({ message: "Apis updated", data: updatedTokens }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}

// GET -> Get all apis of logged in user
// POST -> update apis of logged in user