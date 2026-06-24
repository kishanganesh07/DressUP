import crypto from "crypto";
import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDb();
    const body = await req.json();
    const { 
      userId, items, shippingDetails, totalAmount, 
      razorpay_order_id, razorpay_payment_id, razorpay_signature 
    } = body;

    if (!userId || !items || !shippingDetails || totalAmount === undefined) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, message: "Missing payment verification fields" }, { status: 400 });
    }

    // Verify the payment signature
    const bodyString = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(bodyString.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid payment signature" }, { status: 400 });
    }

    const mappedItems = items.map((item: any) => ({
      productId: item._id || item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

    const order = await Order.create({
      userId,
      items: mappedItems,
      shippingDetails,
      totalAmount,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature
    });

    // Clear user's cart in the DB
    await User.findByIdAndUpdate(userId, { $set: { cart: [] } });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
