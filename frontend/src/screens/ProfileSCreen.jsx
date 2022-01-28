import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Alert, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.component'
import { getUserDetails, updateUserProfile } from '../action/userAction'
import { ordersList } from '../action/orderAction'
import Messeage from '../components/Messeage'
import { LinkContainer } from 'react-router-bootstrap'



function ProfileScreen({ location, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const ordersmyList = useSelector(state => state.ordersList)
  const { loading: loadingList, error: errorList, orders } = ordersmyList

  console.table(orders);
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile || null

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(ordersList())
      }
      else {
        setName(user.name)
        setEmail(user.email)
      }
    }

  }, [dispatch, userInfo, history, user, orders])


  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword || password === '') {
      setMessage("password fo not match ")
    }
    else {
      dispatch(updateUserProfile({
        id: user._id,
        name, password, email
      }))
    }
  }

  
  return (

    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Alert>{message}</Alert>}
        {success && <Alert>success</Alert>}
        {loading && <Loader></Loader>}
        {error && <Alert>{error}</Alert>}
        <Form onSubmit={submitHandler}>

          <Form.Group controlId='name'>
            <Form.Label>Name Address</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>my orders</h2>
        {loadingList ? <Loader /> : errorList ? <Messeage variant={'danger'}>{errorList}</Messeage > : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAl</th>
                <th>PAID</th>
                <th>DELIVERD</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                orders.map(order=>(

                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>{order.totalPrice} $</td>
                    <td>{order.isPaid?order.paidAt.substring(0,10):<i className='fas fa-times fa-2x' style={{ color: "red" }}></i>}</td>
                    <td>{order.isDelivered?order.paidAt.substring(0,10):<i className='fas fa-times fa-2x' style={{ color: "red" }}></i>}</td>
                    <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                  </tr>
                  
                ))
              }
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
