
import React, { useState } from 'react'
import { Form, Button ,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContiner from '../components/FormContiner.component'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../action/cartAction'
const PaymentScreen = ({ history }) => {

  const cart= useSelector(state => state.cart)
  const {shippingAddress}=cart
  if(!shippingAddress){
    history.push('/shipping')
  }


  const [paymentMethod, setPaymentMethod] = useState('paypal')
 
  const dispatch = useDispatch()

  const sumitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(savePaymentMethod(paymentMethod)))
    history.push('/placeorder')
  }

  return (
    <FormContiner>
      <CheckoutSteps step1 step2 step3/>
      <h1>Payment Method</h1>
      <Form onSubmit={sumitHandler}>

        <Form.Group>
          <Form.Label as="legend">
            select method
          </Form.Label>
         
          {/* <div><br></br><br></br></div> */}
          <Col>
          <Form.Check type='radio' label="PayPal or Credit Cart" id='paypal' name='paymentMethod' value='paypal' checked onChange={(e)=>setPaymentMethod(e.target.value)} ></Form.Check>
          </Col>
          </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContiner>
  )
}

export default PaymentScreen