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
        await User.create({
            name,email,password:hashedPassword,
        })
        return NextResponse.json({
      success: true,
      message: "Account created",
    });
        

    }catch(e){
        return NextResponse.json({
      success: false,
      e,
    });

    }
}