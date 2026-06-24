import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDb();
    
    // Fetch all orders and populate the user details
    const orders = await Order.find()
      .populate({ path: "userId", select: "name email", model: User })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
