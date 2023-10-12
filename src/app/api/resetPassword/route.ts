import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient()

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token, password} = reqBody
       
        const user = await prisma.user.findFirst({
            where: {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: { gt: new Date() }
            }
        });

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        
        if(!password) {
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        //hash password
        // const salt = await bcryptjs.genSalt(10)
        // const hashedPassword = await bcryptjs.hash(password, salt)

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: password,
                forgotPasswordToken: null,
                forgotPasswordTokenExpiry: null
            }
        });
        
        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}
