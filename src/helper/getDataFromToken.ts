import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || 'a';
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        //@ts-expect-error: unknown
        return decodedToken.userId;
    } catch (error) {
        console.log(error)
        return null;
    }
}