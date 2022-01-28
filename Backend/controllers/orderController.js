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
    res.status(201).json(createdOrder)
  } catch (error) {

    res.status(400).json(error.message)
  }
}


//desc create new order 
//route GET /api/orders/:id
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

//desc update order to paid 
//route GET /api/orders/:id/pay
//access private
const updateOrderToPaid = async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
  if (order) {
     order.isPaid=true;
    order.paidAt=Date.now()
    order.paymentReult={
      id:req.body.id,
      statu:req.body.status,
      update_time:req.body.update_time,
      email_addres:req.body.payer.email_addres
    }
    const updateOrder=await order.save()
    console.log(req.body);
    res.json(updateOrder)


  }
  else {
    res.status(404).send('order not found')
  }
}

//desc logged in user order order to paid 
//route GET /api/orders/myorders
//access private
const getUerOrders = async (req, res) => {
  // try {
  //   const orders = await OrderModel.find({user:req.user._id})
  //   res.json(orders)
  // } catch (error) {
  //   res.status(400).json(error)
  // }
res.send("foad")
}

const getUserListOrdes=async(req,res)=>{
 try {
    const orders = await OrderModel.find({user:req.user._id})
    res.json(orders)
  } catch (error) {
    res.status(400).json(error)
  }
}
export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUerOrders,
  getUserListOrdes
}
