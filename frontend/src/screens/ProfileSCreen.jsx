import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.component'
import { getUserDetails,updateUserProfile } from '../action/userAction'



function ProfileScreen({ location, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state =>state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state =>state.userUpdateProfile)
  const { success } = userUpdateProfile||null

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      }
      else {
        setName(user.name)
        setEmail(user.email)
      }
    }

  }, [dispatch, userInfo, history,user])


  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword || password === '') {
      setMessage("password fo not match ")
    }
    else {
      dispatch(updateUserProfile({
        id:user._id,
        name,password,email
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
          {
            //name
          }
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
      </Col>
    </Row>
  )
}

export default ProfileScreen
