import express from 'express'
import { addOrderItems, getOrderById, getUerOrders, getUserListOrdes, updateOrderToPaid } from '../controllers/orderController.js'
import {protect} from '../Middleware/auth.js'
const router = express.Router()


router.post('/', protect, addOrderItems)
router.get('/myorders', protect, getUserListOrdes)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)




export default router