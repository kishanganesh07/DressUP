import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDb();
    const result = await User.updateMany({}, { $set: { isAdmin: true } });
    return NextResponse.json({ success: true, message: `Upgraded ${result.modifiedCount} users to Admin.` });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
