import express from "express";
import productModel from "../models/ProductModel.js";
const router = express.Router();

//desc Fetch all products
router.get('/', async (req, res) => {
  const products = await productModel.find({});
  res.json(products)
})

router.get('/:id', async (req, res) => {
  const item = await productModel.findById(req.params.id)
  if (item) {
    res.json(item)
  }
  else
    res.json({ message: "product not found" })
})

export default router