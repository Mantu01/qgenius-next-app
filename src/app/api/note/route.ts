import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";


// GET -> Get all notes
// POST -> initialize a note
