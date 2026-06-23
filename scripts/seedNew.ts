import mongoose from "mongoose";
import dotenv from "dotenv";
import { 
  MEN_POLO_T_SHIRTS, MEN_ROUND_NECK_T_SHIRTS, MEN_CASUAL_SHIRTS, MEN_FORMAL_SHIRTS,
  MEN_CASUAL_TROUSERS, MEN_FORMAL_TROUSERS, MEN_JEANS, MEN_CARGOS,
  WOMEN_DRESSES, WOMEN_TOPS, WOMEN_JEANS, WOMEN_FORMAL_SHIRTS, WOMEN_FORMAL_TROUSERS
} from "../src/lib/mockData";

import MenPoloTShirt from "../src/models/men/MenPoloTShirt";
import MenRoundNeckTShirt from "../src/models/men/MenRoundNeckTShirt";
import MenCasualShirt from "../src/models/men/MenCasualShirt";
import MenFormalShirt from "../src/models/men/MenFormalShirt";
import MenCasualTrouser from "../src/models/men/MenCasualTrouser";
import MenFormalTrouser from "../src/models/men/MenFormalTrouser";
import MenJeans from "../src/models/men/MenJeans";
import MenCargo from "../src/models/men/MenCargo";

import WomenDress from "../src/models/women/WomenDress";
import WomenTop from "../src/models/women/WomenTop";
import WomenJeans from "../src/models/women/WomenJeans";
import WomenFormalShirt from "../src/models/women/WomenFormalShirt";
import WomenFormalTrouser from "../src/models/women/WomenFormalTrouser";

dotenv.config({ path: ".env" });

const seedMapping = [
  { model: MenPoloTShirt, data: MEN_POLO_T_SHIRTS, name: "Men's Polo T-Shirts" },
  { model: MenRoundNeckTShirt, data: MEN_ROUND_NECK_T_SHIRTS, name: "Men's Round Neck T-Shirts" },
  { model: MenCasualShirt, data: MEN_CASUAL_SHIRTS, name: "Men's Casual Shirts" },
  { model: MenFormalShirt, data: MEN_FORMAL_SHIRTS, name: "Men's Formal Shirts" },
  { model: MenCasualTrouser, data: MEN_CASUAL_TROUSERS, name: "Men's Casual Trousers" },
  { model: MenFormalTrouser, data: MEN_FORMAL_TROUSERS, name: "Men's Formal Trousers" },
  { model: MenJeans, data: MEN_JEANS, name: "Men's Jeans" },
  { model: MenCargo, data: MEN_CARGOS, name: "Men's Cargos" },
  { model: WomenDress, data: WOMEN_DRESSES, name: "Women's Dresses" },
  { model: WomenTop, data: WOMEN_TOPS, name: "Women's Tops" },
  { model: WomenJeans, data: WOMEN_JEANS, name: "Women's Jeans" },
  { model: WomenFormalShirt, data: WOMEN_FORMAL_SHIRTS, name: "Women's Formal Shirts" },
  { model: WomenFormalTrouser, data: WOMEN_FORMAL_TROUSERS, name: "Women's Formal Trousers" },
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not set in .env");

    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");

    for (const mapping of seedMapping) {
      console.log(`Clearing collection for ${mapping.name}...`);
      await mapping.model.deleteMany({});

      if (!mapping.data || mapping.data.length === 0) {
        console.log(`No data to seed for ${mapping.name}, skipping.`);
        continue;
      }

      const productsToInsert = mapping.data.map((prod) => ({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        category: prod.category,
        subcategory: prod.subcategory,
        brand: prod.brand,
        material: prod.material,
        sizes: prod.sizes,
        colors: prod.colors,
        images: prod.images,
        stock: 100,
        featured: false,
      }));

      await mapping.model.insertMany(productsToInsert);
      console.log(`Seeded ${productsToInsert.length} items to ${mapping.name}`);
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seed();
