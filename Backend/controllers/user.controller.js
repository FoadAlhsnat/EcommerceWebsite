import UserModel from '../models/userModel.js'
import generateToken from '../utils/genToken.js'




//desc Auth user &get token
//route POST /api/users/login
//access publec

const authUser=async(req,res)=>{
  
  const {email,password}=req.body
console.log(email+" "+password);
  const user=await UserModel.findOne({email})
  if(user&& await user.matchPassword(password)){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmen:user.isAdmen,
      token:generateToken(user._id),
    })
  }
  res.status(401).send("invalid email or password")
}


//descGEt user profile
//route GIT /api/users/profile
//access Private

const getUserProfile=async(req,res)=>{
  const user=await UserModel.findById(req.user._id)
  if(user){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmen:user.isAdmen,
    })
  }
  else{
    res.status(404).send("user not found")
  }
}




//desc Register new user
//route POST /api/users
//access publec

const registerUser=async(req,res)=>{
  
  const {name,email,password}=req.body
  const userExist=await UserModel.findOne({email})
  if(userExist){
    res.status(400).send('User already exist')
  }

  try {
    const user=await UserModel.create({
      name,
      email,
      password
    })
  
    if(user){
      res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmen:user.isAdmen,
        token:generateToken(user._id),
      })
    }
  } catch (error) {
    res.status(400).send("invaled user data");
  }
  
  
    
}


export{
  authUser,
  getUserProfile,
  registerUser
}