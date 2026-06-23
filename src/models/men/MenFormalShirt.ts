import mongoose from "mongoose";
import { BaseProductSchemaDefinition } from "../BaseSchema";

const schema = new mongoose.Schema(BaseProductSchemaDefinition, { timestamps: true });
export default mongoose.models.MenFormalShirt || mongoose.model("MenFormalShirt", schema, "men_formal_shirts");
