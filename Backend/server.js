const express = require('express');
const products = require('./Data/products')

const app = express()

const cors = require('cors');
app.use(cors(
  {
    origin: "*"
  }
));


app.get('/', (req, res) => {
  res.send("api is running")
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const item = products.find(p => p._id === req.params.id)
  res.json(item)
})


app.listen(5000, console.log('server run at port 5000'))