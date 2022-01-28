import UserModel from '../models/userModel.js'
import generateToken from '../utils/genToken.js'




//desc Auth user &get token
//route POST /api/users/login
//access publec

const authUser=async(req,res)=>{
  try {
    const {email,password}=req.body
  
    const user=await UserModel.findOne({email})
    console.log(user.isAdmin);
    if(user&& await user.matchPassword(password)){
      res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id),
      })
    }
  } catch (error) {
    res.status(401).send("invalid email or password")
  }
}


//desc Get user profile
//route GET /api/users/profile
//access Private

const getUserProfile=async(req,res)=>{
  const user=await UserModel.findById(req.user._id)
  if(user){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
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
  console.log(req.body);
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


//desc Get all users
//route GET /api/users
//access Private/Admin

const getAllUsers=async(req,res)=>{
  try {
    const users=await UserModel.find({})
    res.json(users)
  } catch (error) {
    res.status(400).json(error)
  }
  
}


//desc Delete  user
//route DELETE /api/users/:id
//access Private/Admin

const deleteUser=async(req,res)=>{
  try {
    const user=await UserModel.findById(req.params.id)
    await user.remove()
    res.json({message:"user removed"})
  } catch (error) {
    res.status(400).json(error)
  }
  
}


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  const user = await UserModel.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  console.log('foad');
  console.log(req.body);
  const user = await UserModel.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404).send('User not found')

  }
}

export{
  authUser,
  getUserProfile,
  registerUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser
}