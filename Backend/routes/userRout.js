import express from 'express'
import { authUser,getUserProfile,registerUser } from '../controllers/user.controller.js'
import protect from '../Middleware/auth.js'
const router = express.Router()

router.post('/',registerUser)
router.get('/login',authUser )
router.get('/profile',protect,getUserProfile)


export default router