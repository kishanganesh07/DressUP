import mongoose from "mongoose";

export const BaseProductSchemaDefinition = {
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, default: "" },
  brand: { type: String, default: "" },
  material: { type: String, default: "" },
  sizes: { type: [String], required: true },
  colors: { type: [String], required: true },
  images: { type: [String], required: true },
  stock: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false },
};
