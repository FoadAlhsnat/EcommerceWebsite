import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
})

userSchema.methods.matchPassword=async function(enteredpass){
  return await bcrypt.compare(enteredpass,this.password)
}

userSchema.pre("save",async function (next){
  if(!this.isModified('password')){
    next()
  }
  const salt=await bcrypt.genSalt(10)
this.password=await bcrypt.hash(this.password,salt)
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel