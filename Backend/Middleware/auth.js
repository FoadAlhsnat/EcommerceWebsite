import Jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'


const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = Jwt.verify(token, process.env.JWT_SECRET)

      req.user = await UserModel.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401).send('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401).send('not authorized')
  }

}

const isAdmin=(req,res,next)=>{
if(req.user&&req.user.isAdmin){
  next()
}
else res.status(401).send('not authorized as in admin')
}

export  {protect,isAdmin}