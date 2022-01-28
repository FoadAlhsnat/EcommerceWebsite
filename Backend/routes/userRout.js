import express from 'express'
import { authUser, deleteUser, getAllUsers, getUserById, getUserProfile, registerUser, updateUser } from '../controllers/user.controller.js'
import { protect, isAdmin } from '../Middleware/auth.js';
;

const router = express.Router()

router.post('/', registerUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.get('/', protect,isAdmin, getAllUsers)
router.put('/:id',protect,isAdmin,updateUser)
router.delete('/:id',protect,isAdmin,deleteUser)
router.get('/:id',protect,isAdmin,getUserById)

export default router