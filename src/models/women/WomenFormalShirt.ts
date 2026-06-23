import mongoose from "mongoose";
import { BaseProductSchemaDefinition } from "../BaseSchema";

const schema = new mongoose.Schema(BaseProductSchemaDefinition, { timestamps: true });
export default mongoose.models.WomenFormalShirt || mongoose.model("WomenFormalShirt", schema, "women_formal_shirts");
