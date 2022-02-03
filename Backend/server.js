import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoute from './routes/product.route.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoute from './routes/userRout.js'
import orderROute from './routes/orderROute.js'
import cors from 'cors'


dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use((bodyParser.json()))


app.use('/api/orders', orderROute)
app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLINT_ID))

app.use(notFound)
app.use(errorHandler)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => console.log(`server run in ${process.env.NODE_ENV} on port ${PORT}`))
