import mongoose from "mongoose";
import { BaseProductSchemaDefinition } from "../BaseSchema";

const schema = new mongoose.Schema(BaseProductSchemaDefinition, { timestamps: true });
export default mongoose.models.MenCasualShirt || mongoose.model("MenCasualShirt", schema, "men_casual_shirts");
