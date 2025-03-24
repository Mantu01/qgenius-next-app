import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import prisma from "@/DB/dbConfig";

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}