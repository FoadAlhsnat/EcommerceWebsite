import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.component'
import { getUserDetails ,updateUSer} from '../action/userAction'
import FormContiner from '../components/FormContiner.component'
import Messeage from '../components/Messeage'


function UserEdit({ match, history }) {

  const userId=match.params.id
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [name, setName] = useState('')

  const dispatch = useDispatch()
  
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading:loadingUpdate, error:errorUpdate, success } = userUpdate

  useEffect(() => {
    if(success){
      dispatch({type:"USER_UPDATE_RESET"})
      
      history.push('/admin/userlist')
    }
    else{
      if(!user||user._id!==userId){
        dispatch(getUserDetails(userId))
      }else{
        setEmail(user.email)
        setName(user.name)
        setIsAdmin(user.isAdmin)
      }
    }

  }, [user,dispatch,history,userId,success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUSer({
      _id:userId,
      name,
      email,
      isAdmin
    }))
  }
  return (
    <>
    <Link to="/admin/userlist" className='btn btn-ligt my-3'>Go Back</Link>
    <FormContiner>
      <h1>Edit User</h1>
      {loadingUpdate&&<Loader/>}
      {errorUpdate&&<Messeage variant={'danger'}>{errorUpdate}</Messeage>}
      {loading?<Loader/>:error?<Messeage variant={'danger'}>{error}</Messeage>:(
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

        <Form.Group controlId='isAdmin'>
          <Form.Check
            type='checkboc'
            label='is Admin'
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
        </Form.Group>
        <Button type='submit' variant="primary" >
          Update
        </Button>
      </Form>
      )}
    </FormContiner>
    </>
   
  )
}

export default UserEdit
