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

const menModels = [
  MenPoloTShirt, MenRoundNeckTShirt, MenCasualShirt, MenFormalShirt,
  MenCasualTrouser, MenFormalTrouser, MenJeans, MenCargo
];

const womenModels = [
  WomenDress, WomenTop, WomenJeans, WomenFormalShirt, WomenFormalTrouser
];

// Helper to determine which models to search
function getModelsToSearch(category: string | null) {
  if (category === "Men") return menModels;
  if (category === "Women") return womenModels;
  return allModels;
}

export async function GET(req: Request) {
  try {
    await connectDb();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const featured = searchParams.get("featured");

    const query: any = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;
    if (featured === "true") query.featured = true;

    const modelsToSearch = getModelsToSearch(category);

    const results = await Promise.all(
      modelsToSearch.map((model) => model.find(query).lean())
    );

    // Flatten and sort by createdAt (if available, otherwise fallback)
    const products = results
      .flat()
      .sort((a: any, b: any) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
