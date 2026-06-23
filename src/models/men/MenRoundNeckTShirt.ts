import mongoose from "mongoose";
import { BaseProductSchemaDefinition } from "../BaseSchema";

const schema = new mongoose.Schema(BaseProductSchemaDefinition, { timestamps: true });
export default mongoose.models.MenRoundNeckTShirt || mongoose.model("MenRoundNeckTShirt", schema, "men_round_neck_tshirts");
