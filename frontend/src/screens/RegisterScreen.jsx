import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.component'
import { register } from '../action/userAction'
import FormContiner from '../components/FormContiner.component'


function Rehistercreen({ location, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister


  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }

  }, [history, userInfo, redirect])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword || password === '') {
      setMessage("password fo not match ")
    }
    else {
      const userInfo = {
        name, email, password
      }
      dispatch(register(userInfo))
    }


  }
  return (
    <FormContiner>
      <h1>Sign Up</h1>
      {message && <Alert>{message}</Alert>}
      {loading && <Loader></Loader>}
      {error && <Alert>{error}</Alert>}
      <Form onSubmit={submitHandler}>
        {
          //name
        }
        <Form.Group controlId='name'>
          <Form.Label>Name </Form.Label>
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
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer? <Link to={'/login'}>Log in</Link>
        </Col>
      </Row>
    </FormContiner>
  )
}

export default Rehistercreen
