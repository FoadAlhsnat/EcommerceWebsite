import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import  productRoute from './routes/product.route.js'
import cors from 'cors'
dotenv.config()


connectDB()
const app = express()

const PORT=process.env.PORT||5000;
app.use(cors())

app.use('/api/products',productRoute)


app.get('/', (req, res) => {
  res.send("api is running")
})




app.listen(PORT, console.log(`server run in ${process.env.NODE_ENV} on port ${PORT}`))