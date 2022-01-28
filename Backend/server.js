// import express from 'express'
// import dotenv from 'dotenv'
// // import connectDB from './config/db.js'
// // import productRoute from './routes/product.route.js'
// // import userRoute from './routes/userRout.js'
// // import cors from 'cors'
// dotenv.config()


// // connectDB()
// const app = express()
// app.use(express.json)
// const PORT = process.env.PORT || 5000;
// // app.use(cors())

// // app.use('/api/users', userRoute)
// // app.use('/api/products', productRoute)





// app.get('/', (req, res) => {
//   console.log('hi');
//   res.send("api is running")
// })








import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoute from './routes/product.route.js'
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
app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLINT_ID))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => console.log(`server run in ${process.env.NODE_ENV} on port ${PORT}`))