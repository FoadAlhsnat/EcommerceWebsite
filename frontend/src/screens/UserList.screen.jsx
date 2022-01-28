import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader.component'
import Messeage from '../components/Messeage'
import { deleteUser, listUsers } from '../action/userAction'

const UserList = ({history}) => {
  const dispatch = useDispatch()
  const userList = useSelector(state => state.userList)
  const { loading, users, error } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userDelete = useSelector(state => state.userDelete)
  const { success } = userDelete

  useEffect(() => {

    if(userInfo&&userInfo.isAdmin){

      dispatch(listUsers())
    }
    else{
      history.push('/login')
    }
  }, [dispatch,history,success,userInfo])

const deleteHandler=(id)=>{
dispatch(deleteUser(id))
}

  return (<>
    {loading ? <Loader /> : error ? <Messeage variant={'danger'} text={error}></Messeage> : (
      <Table striped bordered hover responsive classname="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td><a href={`mailto=${user.email}`}>{user.email}</a></td>
              <td>{user.isAdmin?<i className='fas fa-check fa-2x' style={{color:'green'}}></i>:<i className='fas fa-times fa-2x' style={{color:'red'}}></i>}</td>
              <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className="btn-sm"><i className='fas fa-edit fa-2x'></i></Button>
                    </LinkContainer>
                    <Button variant='danger' className="btn-sm" onClick={()=>{
                      deleteHandler(user._id)
                    }}><i className='fas fa-trash fa-2x'></i></Button>
                  </td>
            </tr>
          ))}
        </tbody>

      </Table>
    )}
  </>)
};

export default UserList;
