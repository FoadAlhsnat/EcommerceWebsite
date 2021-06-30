import mongoose from "mongoose";

const connectDB=async()=>{
  try {
    const connection=await mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true 
    })

    console.log(`MongoDB connected in: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

export default connectDB