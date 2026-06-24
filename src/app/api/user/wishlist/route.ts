import connectDb from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const getUserFromToken = (req: Request) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    return decoded.id;
  } catch (error) {
    return null;
  }
};

export async function GET(req: Request) {
  try {
    await connectDb();
    const userId = getUserFromToken(req);
    
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, wishlist: user.wishlist || [] });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDb();
    const userId = getUserFromToken(req);
    
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { wishlist } = await req.json();

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { wishlist } },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error", error }, { status: 500 });
  }
}
