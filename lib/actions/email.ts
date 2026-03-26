// lib/actions/email.ts
"use server";
import nodemailer from "nodemailer";

export async function sendReplyEmail(to: string, name: string, reply: string, originalMessage: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();
    console.log("Email transporter is ready");

    const mailOptions = {
      from: `"Signature by Feeha" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: `Reply from Signature by Feeha - Regarding your inquiry`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border: 1px solid #C9A84C; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #C9A84C; font-size: 24px;">Signature by Feeha</h1>
            <div style="height: 2px; background: linear-gradient(to right, transparent, #C9A84C, transparent);"></div>
          </div>
          
          <p style="color: #1a0a00; font-size: 16px;">Dear <strong>${name}</strong>,</p>
          
          <p style="color: #5a3e1a; font-size: 14px; line-height: 1.6;">
            Thank you for reaching out to us. Here's our response to your inquiry:
          </p>
          
          <div style="background: #f8f5f0; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 3px solid #C9A84C;">
            <p style="color: #5a3e1a; font-size: 14px; line-height: 1.6; margin: 0;">
              ${reply.replace(/\n/g, '<br/>')}
            </p>
          </div>
          
          <div style="background: rgba(201,168,76,0.05); padding: 12px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #8B6914; font-size: 12px; margin: 0 0 5px 0;"><strong>Your original message:</strong></p>
            <p style="color: #5a3e1a; font-size: 12px; margin: 0;">${originalMessage.substring(0, 200)}${originalMessage.length > 200 ? '...' : ''}</p>
          </div>
          
          <p style="color: #5a3e1a; font-size: 14px; margin-top: 20px;">
            If you have any further questions, feel free to reply to this email or contact us on WhatsApp at +923353537028.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(201,168,76,0.3); text-align: center;">
            <p style="color: #a89070; font-size: 12px;">
              © 2024 Signature by Feeha. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { 
      success: false, 
      error: "Failed to send email" 
    };
  }
}

export async function sendPasswordResetEmail(email: string, name: string, resetLink: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"Signature by Feeha" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password - Signature by Feeha",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border: 1px solid #C9A84C; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #C9A84C; font-size: 24px;">Signature by Feeha</h1>
            <div style="height: 2px; background: linear-gradient(to right, transparent, #C9A84C, transparent);"></div>
          </div>
          
          <p style="color: #1a0a00; font-size: 16px;">Dear <strong>${name}</strong>,</p>
          
          <p style="color: #5a3e1a; font-size: 14px; line-height: 1.6;">
            We received a request to reset your password. Click the button below to create a new password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="display: inline-block; background: linear-gradient(135deg, #1a0f00, #0d0800); color: #C9A84C; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; border: 1px solid #C9A84C;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #5a3e1a; font-size: 12px; line-height: 1.6;">
            If you didn't request this, please ignore this email. This link will expire in 1 hour.
          </p>
          
          <p style="color: #5a3e1a; font-size: 12px; margin-top: 20px;">
            Or copy this link: <span style="color: #8B6914;">${resetLink}</span>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(201,168,76,0.3); text-align: center;">
            <p style="color: #a89070; font-size: 12px;">
              © 2024 Signature by Feeha. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    return false;
  }
}