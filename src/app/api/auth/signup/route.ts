import connectDb from "@/lib/mongodb"
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        await connectDb();
        const {name,email,password}=await req.json()
        const userExists=await User.findOne({email})
        if(userExists){
            return NextResponse.json({
                message:"User already exists",
            })
        }
        const hashedPassword=await bcrypt.hash(password,10)
        
        const isAdmin = email === "kishan328125@gmail.com";

        await User.create({
            name,email,password:hashedPassword,isAdmin
        })
        return NextResponse.json({
      success: true,
      message: "Account created",
    });
        

    } catch (e: any) {
      console.error("Signup Error:", e);
      return NextResponse.json({
        success: false,
        message: e.message || "An error occurred during signup",
      });
    }
}