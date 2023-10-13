import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'waldo29@ethereal.email',
      pass: 'xY74Gj2jvep3xAfkRw'
  }
});
export const sendOTPMail=async (otp:string|number, email: string) => {
    const mailOptions = {
        from: 'siddhartthjain@gmail.com',
        to: email,
        subject: "OTP for email verification",
        text: `hi your otp for emaul verification is ${otp} please do not share it with anyone`,
      };
    
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    
}