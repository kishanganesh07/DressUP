const fs = require('fs');
let rawData = fs.readFileSync('./public/mmmmm.json', 'utf8');

// The file has multiple concatenated JSONs. We can use a trick to make it an array.
// Replace }{ with },{ and wrap in []
rawData = rawData.replace(/\}\s*\{"success"/g, '},{"success"');
rawData = '[' + rawData + ']';

let allHits = [];

try {
  const dataArray = JSON.parse(rawData);
  dataArray.forEach(data => {
    if (data.results && data.results.products && data.results.products.hits) {
      allHits = allHits.concat(data.results.products.hits);
    }
  });
} catch (e) {
  console.log("Error parsing combined JSON:", e.message);
}

const formatted = allHits.map(hit => {
  const source = hit._source;
  
  // Extract images
  const images = [];
  if (source.Images) {
    const ids = source.Images.split(',').filter(Boolean);
    ids.forEach(id => {
      images.push(`https://imagescdn.allensolly.com/img/app/product/${source.FolderID}/${source.ProductID}-${id}.jpg`);
    });
  }

  // Extract sizes
  let sizes = [];
  if (source.Sizes && source.Sizes.AvailableSizes) {
    sizes = source.Sizes.AvailableSizes.split(',').filter(Boolean);
  }

  // Material
  let material = "100% Cotton";
  if (source.ProductAttributes) {
    const matAttr = source.ProductAttributes.find(a => a.AttributeName === 'Material');
    if (matAttr) material = matAttr.AttributeValue;
  }

  return {
    _id: source.ProductID.toString(),
    name: source.Title || source.Description || "Men Formal Shirt",
    price: source.Price || 1999,
    description: `Material: ${material}. Premium Allen Solly menwear.`,
    category: "Men",
    subcategory: "Formal Shirts",
    brand: source.Brand || "Allen Solly",
    material: material,
    sizes: sizes.length > 0 ? sizes : ["39", "40", "42", "44"],
    colors: [source.MasterColor || "Multi"],
    images: images
  };
});

fs.writeFileSync('./public/mens_formal_shirts.json', JSON.stringify(formatted, null, 2));
console.log(`Saved ${formatted.length} men formal shirts to public/mens_formal_shirts.json`);
