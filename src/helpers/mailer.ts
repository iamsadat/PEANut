import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const primsa = new PrismaClient();

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log(hashedToken);
        if (emailType === "VERIFY") {

            await primsa.user.update({
                where: { id: userId },
                data: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000)
                }
            });

        } else if (emailType === "RESET") {

            await primsa.user.update({
                where: { id: userId },
                data: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "afceab3647b065",
              pass: "432581b3b3109b"
            }
          });

        const mailOptions = {
            from: 'peanut21092003@gmail.com',
            to: email,
            subject: emailType === "RESET" ? "Reset your Password" : "Verify your account",
            html: `<p>Click <a href="${process.env.DOMAIN}${emailType === "RESET" ? "/resetpassword" : "/verifyemail"}?token=${hashedToken}">here</a> to ${emailType === "RESET" ? "reset your password" : "verify your email"}
                    or copy and paste the link below in your browser.<br>${process.env.DOMAIN}${emailType === "RESET" ? "/resetpassword" : "/verifyemail"}?token=${hashedToken}</p>`,
        };

        const mailresponse = await transport.sendMail(mailOptions);
        console.log(mailresponse);

        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}
