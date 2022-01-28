import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Messeage'
import Loader from '../components/Loader.component'
import { getOrderDetails, payOrder } from '../action/orderAction'


const OrderScreen = ({ match }) => {
  const dispatch = useDispatch()
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, error } = orderDetails
  let{loading}=orderDetails
  if(loading===undefined){
    loading=true
  }
  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success } = orderPay

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get('http://localhost:5000/api/config/paypal')

      const script = document.createElement("script")
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || success) {
      dispatch({type:"ORDER_PAY_RESET"})
      dispatch(getOrderDetails(orderId))
    }
    else if (!window.paypal) {
      addPaypalScript()
    } else setSdkReady(true)

  }, [order, orderId, success, dispatch])

const succesPaymentHandler=(payMentResult)=>{
  console.log(payMentResult);
dispatch(payOrder(orderId,payMentResult))
}
console.log(loading+"=loading");
  return loading ? <Loader /> : error ? <Message>{error}</Message> : (
    <>

       <h1>order {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>


              <h2>Shipping</h2>
              <p><strong>Name: </strong>{order.user.name}</p>
              <p><strong>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a></strong></p>


              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant='success' text={`Delivered on ${order.deliveredAt}`}>
                
                </Message>
              ) : (
                <Message variant='danger' text='Not Delivered'></Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <p><h2>Payment Method</h2>
                <strong>Method: </strong>
                {order.paymentMethod}</p>

              {order.isPaid ? (
                <Message variant='success' text={`Paid on ${order.paidAt}`}></Message>
              ) : (
                <Message variant='danger' text='Not Paid'></Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay&&<Loader/>}
                  {!sdkReady?<Loader/>:(
                    <PayPalButton amount={order.totalPrice} onSuccess={succesPaymentHandler}/>
                  )}
                </ListGroup.Item>
              )}

            </ListGroup>
          </Card>
        </Col>
      </Row>   
    </>
  )
}

export default OrderScreen