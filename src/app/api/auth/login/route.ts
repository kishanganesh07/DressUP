import connectDb from "@/lib/mongodb"
import User from "@/models/User"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try{
        await connectDb()
        const {email,password}=await req.json()
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({
                message:"Invalid Creditials"
            })

        }
        const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return NextResponse.json({
        message: "Invalid credentials",
      });
    }
      const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    return NextResponse.json({
      success: true,
      token,
      user,
    });


    }catch(e){
         return NextResponse.json({
      success: false,
      e,
    });

    }

}