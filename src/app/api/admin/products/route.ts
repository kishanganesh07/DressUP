import { NextResponse } from "next/server";
import connectDb from "@/lib/mongodb";
import jwt from "jsonwebtoken";

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

const modelMap: Record<string, Record<string, any>> = {
  Men: {
    "Polo T-Shirts": MenPoloTShirt,
    "Round Neck T-Shirts": MenRoundNeckTShirt,
    "Casual Shirts": MenCasualShirt,
    "Formal Shirts": MenFormalShirt,
    "Casual Trousers": MenCasualTrouser,
    "Formal Trousers": MenFormalTrouser,
    "Jeans": MenJeans,
    "Cargos": MenCargo,
  },
  Women: {
    "Dresses": WomenDress,
    "Tops": WomenTop,
    "Jeans": WomenJeans,
    "Formal Shirts": WomenFormalShirt,
    "Formal Trousers": WomenFormalTrouser,
  }
};

export async function POST(req: Request) {
  try {
    await connectDb();

    // Authenticate and authorize admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    if (!decoded.isAdmin) {
      return NextResponse.json({ success: false, message: "Forbidden - Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { name, description, price, category, subcategory, brand, material, sizes, colors, images } = body;

    if (!name || !price || !category || !subcategory || !images || images.length === 0) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const Model = modelMap[category]?.[subcategory];
    if (!Model) {
      return NextResponse.json({ success: false, message: "Invalid category or subcategory" }, { status: 400 });
    }

    const newProduct = await Model.create({
      name,
      description: description || "",
      price: Number(price),
      category,
      subcategory,
      brand: brand || "",
      material: material || "",
      sizes: sizes || [],
      colors: colors || [],
      images,
      stock: 100,
      featured: false,
    });

    return NextResponse.json({ success: true, message: "Product added successfully", data: newProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
