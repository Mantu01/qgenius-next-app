import { NextResponse } from "next/server";


export async function GET() {
  try {
    const response = NextResponse.json({message: "Logout successful",success: true,});
    response.cookies.set("token", "",{ httpOnly: true, expires: new Date(0)});
    return response;
} catch (error) {
  console.error("Error while logging out :: Error :: ", error);
  return NextResponse.json({message:"Severe error while logut", error }, { status: 500 });
}
}