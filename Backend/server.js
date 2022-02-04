<<<<<<< HEAD
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
=======
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
>>>>>>> da51bf97229775098cd9bac21150994543060080

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

<<<<<<< HEAD
const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
=======
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
>>>>>>> da51bf97229775098cd9bac21150994543060080
