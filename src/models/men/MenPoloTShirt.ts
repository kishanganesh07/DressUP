import mongoose from "mongoose";
import { BaseProductSchemaDefinition } from "../BaseSchema";

const schema = new mongoose.Schema(BaseProductSchemaDefinition, { timestamps: true });
export default mongoose.models.MenPoloTShirt || mongoose.model("MenPoloTShirt", schema, "men_polo_tshirts");
