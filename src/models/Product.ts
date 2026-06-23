import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      default: 0.0,
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
      enum: ["Men", "Women", "Kids", "Accessories", "Footwear"],
    },
    subcategory: {
      type: String,
      default: "",
    },
    brand: {
      type: String,
      default: "",
    },
    material: {
      type: String,
      default: "",
    },
    sizes: {
      type: [String],
      required: true,
      default: ["S", "M", "L", "XL"],
    },
    colors: {
      type: [String],
      required: true,
      default: ["Black", "White"],
    },
    images: {
      type: [String],
      required: true,
      default: ["https://via.placeholder.com/500x500?text=No+Image"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
