import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Alert, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import { addCart ,removeFromCart} from '../action/cartAction'

const Cart = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  const { cartItems } = cart
  

  useEffect(() => {
    if (productId) {
      dispatch(addCart(productId, qty))
    }

  }, [dispatch, productId, qty])
 
  const checkOutHandler=()=>{
    history.push('/login?redirect=shipping')
  }

  const removeFromCarthandler = (id) => {
    console.log(id);
    dispatch(removeFromCart(id))
  }
  const IsEmpty = () => {
    if (cartItems.length === 0) {
      return (<Alert>your cart is empty</Alert>)
    }

    else{
    return (<ListGroup variant="flush">
      {
        cartItems.map(item => (
          <ListGroup.Item key={item.product}>
            <Row>
              <Col md={2}>
                <Image src={item.image} alt={item.name} fluid rounded ></Image>
              </Col>
              <Col md={3}>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              </Col>
              <Col md={2}>${item.price}</Col>
              <Col md={2}>
                <Form.Control as="select" value={item.qty} onChange={e => dispatch(addCart(item.product, Number(e.target.value)
                ))}>
                
                  {
                    [...Array(item.countInStock).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                </Form.Control>
              </Col>
              <Col md={2}>
                <Button type="butten" variant="light" onClick={() => removeFromCarthandler(item.product)}><i className="fas fa-trash"></i></Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))
      }
    </ListGroup>)
  }
}

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        <IsEmpty />
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h2>
              ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button className="btn-block" type="button" disabled={cartItems.length===0} onClick={checkOutHandler}>Checkout </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      
    </Row>
  )
}

export default Cart
