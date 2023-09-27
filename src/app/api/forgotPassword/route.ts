import { Prisma, PrismaClient } from "@prisma/client";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const POST = async (request:NextRequest) => {
    try {
        
        const reqBody = await request.json();
        const {email} = reqBody;

        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })

        console.log(user);

        if(!user){
            return NextResponse.json({ message: "Invalid Token " }, { status: 400 });
        }

        await sendEmail({ email, emailType: "RESET", userId: user.id });

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
          );

    } catch (error:any) {
        return NextResponse.json({error : error.message});
    };
};

export { POST };