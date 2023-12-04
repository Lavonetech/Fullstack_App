// const Product = require('../model/Product');

// const getProduct=async (req,res)=>{

//     try{
//   const product=await Product.find();

//   if(!product || product.length==0){
//     return res.status(404).json({ message: 'No products found' });
//   }
//   res.status(200).json({product})
//     }catch(err){
//         console.log(err)
//         res.status(500).json({message:'server error'});
//     }
// }

// module.exports= {getProduct}

const Product = require("../model/Product");

const getProducts = async (req, res) => {
  try {
    const fields =
      req.query.fields || "name,price,description,rating,category,supply";
    const fieldsArray = fields.split(",");

    const query = Product.find({}, fieldsArray.join(" "));

    const products = await query.exec();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProducts };
