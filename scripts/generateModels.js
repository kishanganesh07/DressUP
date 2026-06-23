const fs = require('fs');
const path = require('path');

const baseSchemaCode = `import mongoose from "mongoose";

export const BaseProductSchemaDefinition = {
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
`;

const modelsConfig = [
  { folder: 'men', name: 'MenPoloTShirt', collection: 'men_polo_tshirts' },
  { folder: 'men', name: 'MenRoundNeckTShirt', collection: 'men_round_neck_tshirts' },
  { folder: 'men', name: 'MenCasualShirt', collection: 'men_casual_shirts' },
  { folder: 'men', name: 'MenFormalShirt', collection: 'men_formal_shirts' },
  { folder: 'men', name: 'MenCasualTrouser', collection: 'men_casual_trousers' },
  { folder: 'men', name: 'MenFormalTrouser', collection: 'men_formal_trousers' },
  { folder: 'men', name: 'MenJeans', collection: 'men_jeans' },
  { folder: 'men', name: 'MenCargo', collection: 'men_cargos' },
  { folder: 'women', name: 'WomenDress', collection: 'women_dresses' },
  { folder: 'women', name: 'WomenTop', collection: 'women_tops' },
  { folder: 'women', name: 'WomenJeans', collection: 'women_jeans' },
  { folder: 'women', name: 'WomenFormalShirt', collection: 'women_formal_shirts' },
  { folder: 'women', name: 'WomenFormalTrouser', collection: 'women_formal_trousers' }
];

fs.mkdirSync(path.join(__dirname, '..', 'src', 'models'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '..', 'src', 'models', 'BaseSchema.ts'), baseSchemaCode);

modelsConfig.forEach(config => {
  const dir = path.join(__dirname, '..', 'src', 'models', config.folder);
  fs.mkdirSync(dir, { recursive: true });

  const code = `import mongoose from "mongoose";
import { BaseProductSchemaDefinition } from "../BaseSchema";

const schema = new mongoose.Schema(BaseProductSchemaDefinition, { timestamps: true });
export default mongoose.models.${config.name} || mongoose.model("${config.name}", schema, "${config.collection}");
`;

  fs.writeFileSync(path.join(dir, `${config.name}.ts`), code);
});

console.log("Model generation complete.");
