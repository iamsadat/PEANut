import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const existingqt = request.cookies.get("qt")?.value || "";

        const response = NextResponse.json({
            message: "quiz started",
            success: true,
        });

        if (existingqt) {
            response.cookies.set("qt", "", {
                httpOnly: true,
                expires: new Date(0),
            });
        }

        const tokenData = {
            quizStart: "yes",
        };

        try {
            const qt = await jwt.sign(tokenData, process.env.QT_SECRET!, {
                expiresIn: "1d",
            });



            response.cookies.set("qt", qt, {
                httpOnly: true,
            });

            return response;
            
        } catch (jwtError) {
            console.error('Error signing JWT token:', jwtError.message);
            return NextResponse.json({ error: 'Failed to sign JWT token' }, { status: 500 });
        }

    } catch (error: any) {
        console.error('Unexpected error:', error.message);
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
