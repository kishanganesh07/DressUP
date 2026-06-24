import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDb from "@/lib/mongodb";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Please provide an email address" },
        { status: 400 }
      );
    }

    await connectDb();

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal that the user does not exist for security reasons
      return NextResponse.json({
        success: true,
        message: "If that email is in our database, we will send a password reset link to it.",
      });
    }

    // Generate a secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token to save in DB (for security, if DB leaks token isn't plain text)
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expiration to 1 hour
    const passwordResetExpires = Date.now() + 60 * 60 * 1000;

    user.resetPasswordToken = passwordResetToken;
    user.resetPasswordExpires = passwordResetExpires;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/reset-password/${resetToken}`;

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const message = {
      from: `${process.env.SMTP_USER}`,
      to: user.email,
      subject: "Password Reset Request - DressUP!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
          <h2 style="color: #18181b; letter-spacing: 2px;">DRESS UP!</h2>
          <p style="font-size: 16px; color: #52525b; line-height: 1.5; margin-top: 30px;">
            You are receiving this email because you (or someone else) has requested the reset of a password.
          </p>
          <a href="${resetUrl}" style="display: inline-block; padding: 15px 30px; margin-top: 30px; background-color: #18181b; color: #fff; text-decoration: none; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
            Reset Password
          </a>
          <p style="font-size: 14px; color: #a1a1aa; margin-top: 40px;">
            If you did not request this, please ignore this email and your password will remain unchanged.
          </p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(message);
      return NextResponse.json({
        success: true,
        message: "Email sent successfully. Please check your inbox.",
      });
    } catch (err) {
      console.error("Email sending failed:", err);
      // Reset token if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return NextResponse.json(
        { success: false, message: "Email could not be sent. Please configure SMTP in your .env file." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred." },
      { status: 500 }
    );
  }
}
