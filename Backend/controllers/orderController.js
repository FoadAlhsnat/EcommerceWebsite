import OrderModel from '../models/orderModel.js'

//desc create new order 
//route POST /api/orders
//access private
const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
console.log(req.body);
    if (orderItems && orderItems.lenght == 0) {
      res.status(400).send('no order items')
    }
    const order = new OrderModel({ orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, user: req.user._id })
    const createdOrder = await order.save()
    res.status(201).json({ "success": "good" })
  } catch (error) {

    res.status(400).json(error.message)
  }
}


//desc create new order 
//route git /api/orders/id
//access private
const getOrderById = async (req, res) => {
  const order = await OrderModel.findById(req.params.id).populate('user', 'name email')
  if (order) {
    res.status(200).json(order)
  }
  else {
    res.status(404).send('order not found')
  }
}

export {
  addOrderItems,
  getOrderById
}
