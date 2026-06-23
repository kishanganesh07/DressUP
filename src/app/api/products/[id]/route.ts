import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import MenPoloTShirt from "@/models/men/MenPoloTShirt";
import MenRoundNeckTShirt from "@/models/men/MenRoundNeckTShirt";
import MenCasualShirt from "@/models/men/MenCasualShirt";
import MenFormalShirt from "@/models/men/MenFormalShirt";
import MenCasualTrouser from "@/models/men/MenCasualTrouser";
import MenFormalTrouser from "@/models/men/MenFormalTrouser";
import MenJeans from "@/models/men/MenJeans";
import MenCargo from "@/models/men/MenCargo";

import WomenDress from "@/models/women/WomenDress";
import WomenTop from "@/models/women/WomenTop";
import WomenJeans from "@/models/women/WomenJeans";
import WomenFormalShirt from "@/models/women/WomenFormalShirt";
import WomenFormalTrouser from "@/models/women/WomenFormalTrouser";

const allModels = [
  MenPoloTShirt, MenRoundNeckTShirt, MenCasualShirt, MenFormalShirt,
  MenCasualTrouser, MenFormalTrouser, MenJeans, MenCargo,
  WomenDress, WomenTop, WomenJeans, WomenFormalShirt, WomenFormalTrouser
];

// GET a single product by ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();
    const { id } = await params;
    
    // Search across all models for the given ID
    let product = null;
    for (const model of allModels) {
      product = await model.findById(id).lean();
      if (product) break;
    }

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid product ID or server error" },
      { status: 500 }
    );
  }
}
