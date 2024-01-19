import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {

        const tokenData = {
            quizStart: "yes",
        };

        const qt = await jwt.sign(tokenData, process.env.QT_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "quiz started",
            success: true,
        });

        response.cookies.set("qt", qt, {
            httpOnly: true,
        });

        return response;
       
    } catch (error: any) {
        console.error('Unexpected error:', error.message);
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
