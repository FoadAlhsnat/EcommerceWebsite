import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import protect from '../Middleware/auth.js'
const router = express.Router()


router.post('/', protect, addOrderItems)
router.get('/:id', protect, getOrderById)


export default router