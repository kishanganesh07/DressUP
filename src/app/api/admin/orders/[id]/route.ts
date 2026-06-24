import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Order from "@/models/Order";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDb();
    
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status || !['Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      return NextResponse.json({ success: false, message: "Invalid status provided" }, { status: 400 });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
