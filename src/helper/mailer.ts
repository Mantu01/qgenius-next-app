import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import prisma from '@/DB/dbConfig';
import { generateEmailHTML } from './mailTemplate';
import { verifyMessage,forgotPassword } from './constants/messages';


type mailInput={
  email:string,
  emailType:string,
  userId:string
}

export const sendEmail=async({email,emailType,userId}:mailInput)=>{
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    const expiry= new Date(Date.now()+3600000);
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_PROVIDER,
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
      }
    });
    if(emailType === 'VERIFY'){
      await prisma.user.update({
        where: { id: userId },
        data: { verifyToken: hashedToken,verifyTokenExpiry:expiry}
      });
    }else{
      await prisma.user.update({
        where: { id: userId },
        data:{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:expiry}
      });
    }
    const messageOptions = {
      title:emailType==="VERIFY"?"Verify your email":"Reset your password",
      message:emailType==="VERIFY"?verifyMessage:forgotPassword,
      link:`${process.env.APP_URL}/verification/${emailType==='VERIFY'?"email":"password"}?token=${hashedToken}`,
      buttonText: emailType === "VERIFY" ? "Verify Email Address" : "Reset Password"
    }
    const templateMsg=generateEmailHTML(messageOptions);

    const info = await transport.sendMail({
      from: "mantu1@gmail.com",
      to: email,
      subject: emailType === 'signup'? 'Confirm your email' : 'Reset Password',
      html:templateMsg
    });
    return info;
  } catch (error) {
    console.error("Error sending mail : ", error);
    return;
  }
}