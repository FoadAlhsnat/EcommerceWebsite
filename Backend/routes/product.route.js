import express from "express";
import {getProducts,getProductById} from '../controllers/product.controller.js'
const router = express.Router();

//desc Fetch all products
router.get('/', getProducts);

router.get('/:id', getProductById)

export default router