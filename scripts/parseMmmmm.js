const fs = require('fs');
try {
  let raw = fs.readFileSync('./public/mmmmm.json', 'utf8');
  const obj1 = JSON.parse(raw.substring(0, 642937));
  const obj2 = JSON.parse(raw.substring(642937));
  const hits = [...obj1.results.products.hits, ...obj2.results.products.hits];
  
  const mapped = hits.map(hit => { 
    const source = hit._source; 
    const images = []; 
    if (source.Images) { 
      source.Images.split(',').filter(Boolean).forEach(id => images.push(`https://imagescdn.allensolly.com/img/app/product/${source.FolderID}/${source.ProductID}-${id}.jpg`)); 
    } 
    let sizes = []; 
    if (source.Sizes && source.Sizes.AvailableSizes) {
      sizes = source.Sizes.AvailableSizes.split(',').filter(Boolean); 
    }
    let material = '100% Cotton'; 
    if (source.ProductAttributes) { 
      const matAttr = source.ProductAttributes.find(a => a.AttributeName === 'Material'); 
      if (matAttr) material = matAttr.AttributeValue; 
    } 
    return { 
      _id: source.ProductID.toString(), 
      name: source.Title || source.Description || 'Men Formal Shirt', 
      price: source.Price || 1999, 
      description: `Material: ${material}. Premium Allen Solly menwear.`, 
      category: 'Men', 
      subcategory: 'Formal Shirts', 
      brand: source.Brand || 'Allen Solly', 
      material: material, 
      sizes: sizes.length > 0 ? sizes : ['39', '40', '42', '44'], 
      colors: [source.MasterColor || 'Multi'], 
      images: images 
    }; 
  });
  
  fs.writeFileSync('./public/mens_formal_shirts.json', JSON.stringify(mapped, null, 2)); 
  console.log('Fixed mens_formal_shirts.json with ' + mapped.length + ' items'); 
} catch(e) { 
  console.error(e.message); 
}
