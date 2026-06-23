import mongoose from "mongoose";
import { BaseProductSchemaDefinition } from "../BaseSchema";

const schema = new mongoose.Schema(BaseProductSchemaDefinition, { timestamps: true });
export default mongoose.models.MenCasualTrouser || mongoose.model("MenCasualTrouser", schema, "men_casual_trousers");
