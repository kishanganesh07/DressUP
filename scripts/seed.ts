import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import MenPoloTShirt from "../src/models/men/MenPoloTShirt";
import MenRoundNeckTShirt from "../src/models/men/MenRoundNeckTShirt";
import MenCasualShirt from "../src/models/men/MenCasualShirt";
import MenFormalShirt from "../src/models/men/MenFormalShirt";
import MenCasualTrouser from "../src/models/men/MenCasualTrouser";
import MenFormalTrouser from "../src/models/men/MenFormalTrouser";
import MenJeans from "../src/models/men/MenJeans";
import MenCargo from "../src/models/men/MenCargo";

// We'll also do women's eventually, but let's map what we have
const modelMap = [
  { model: MenPoloTShirt, file: "polo_tshirts.json" },
  { model: MenRoundNeckTShirt, file: "round_neck_tshirts.json" },
  { model: MenCasualShirt, file: "mens_casual_shirts.json" },
  { model: MenFormalShirt, file: "mens_formal_shirts.json" },
  { model: MenCasualTrouser, file: "mens_casual_trousers.json" },
  { model: MenFormalTrouser, file: "mens_formal_trousers.json" },
  { model: MenJeans, file: "mens_jeans.json" },
  { model: MenCargo, file: "mens_cargos.json" },
];

dotenv.config({ path: ".env" });

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not set in .env");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");

    for (const { model, file } of modelMap) {
      const filePath = path.join(process.cwd(), "public", file);
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        
        // Add default stock & featured fields if missing
        const formattedData = data.map((item: any) => ({
          ...item,
          stock: item.stock ?? 100,
          featured: item.featured ?? false,
        }));

        console.log(`Clearing ${model.modelName}...`);
        await model.deleteMany({});
        
        console.log(`Seeding ${formattedData.length} items into ${model.modelName} (from ${file})...`);
        await model.insertMany(formattedData);
      } else {
        console.warn(`File not found: ${file}`);
      }
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
