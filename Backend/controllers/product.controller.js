import productModel from '../models/ProductModel.js'
//desc Fetch all products
//route GET /api/products
//access Public
const getProducts= async(req,res)=>{
  const products = await productModel.find({});
  res.json(products)
} 



const getProductById= async(req,res)=>{
  const item = await productModel.findById(req.params.id)
  if (item) {
    res.json(item)
  }
  else
    res.json({ message: "product not found" })
} 


export {
  getProductById,getProducts
}