import mongoose from "mongoose";
import { BaseProductSchemaDefinition } from "../BaseSchema";

const schema = new mongoose.Schema(BaseProductSchemaDefinition, { timestamps: true });
export default mongoose.models.WomenFormalTrouser || mongoose.model("WomenFormalTrouser", schema, "women_formal_trousers");
