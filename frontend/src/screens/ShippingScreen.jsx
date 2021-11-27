import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContiner from '../components/FormContiner.component'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../action/cartAction'
const ShippingScreen = ({ history }) => {

  const cart= useSelector(state => state.cart)
  const {shippingAddress}=cart
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const sumitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    history.push('/payment')
  }

  return (
    <FormContiner>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={sumitHandler}>

        {
          /*
          address
          */
        }
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {
          //city
        }
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {
          // postalcode
        }
        <Form.Group controlId='postalCode'>
          <Form.Label>postal Code</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter postal Codes'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {
          //country
        }

        <Form.Group controlId='country'>
          <Form.Label>country</Form.Label>
          <Form.Control
            type='text'
            required
            placeholder='Enter country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>

      </Form>
    </FormContiner>
  )
}

export default ShippingScreen
