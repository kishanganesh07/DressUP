import mongoose from "mongoose";
import { BaseProductSchemaDefinition } from "../BaseSchema";

const schema = new mongoose.Schema(BaseProductSchemaDefinition, { timestamps: true });
export default mongoose.models.MenFormalTrouser || mongoose.model("MenFormalTrouser", schema, "men_formal_trousers");
