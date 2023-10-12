import { Prisma, PrismaClient } from "@prisma/client";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            return NextResponse.json({ message: "Invalid Token " }, { status: 400 });
        }
        await sendEmail({ email, emailType: "RESET", userId: user.id });

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}