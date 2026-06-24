import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import connectDb from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 400 }
      );
    }

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return NextResponse.json(
        { success: false, message: "Invalid token payload" },
        { status: 400 }
      );
    }

    const { email, name, picture } = payload;

    await connectDb();

    // Check if user exists
    let user = await User.findOne({ email });

    // If user doesn't exist, create them
    if (!user) {
      // Create a random password for OAuth users since they don't need one to login
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        password: randomPassword,
        isAdmin: false,
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      success: true,
      token: jwtToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: picture || null,
      },
    });
  } catch (error: any) {
    console.error("Google Auth Error:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}
