import axios from "axios"


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST"
    })


    const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password })
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.message })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: "USER_LOG_OUT"
  })
  dispatch({
    type: "USER_DETAILS_RESET"
  })
  dispatch({
    type: "ORDER_LIST_RESET"
  })
  dispatch({
    type: "USER_LIST_RESET"
  })
}


export const register = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_REGISTER_REQUEST"
    })


    const { data } = await axios.post('http://localhost:5000/api/users', userInfo)
    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data
    })

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error.message })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    console.log(id);
    dispatch({
      type: "USER_DETAILS_REQUEST"
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        "Content-Type": "applicatin/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`http://localhost:5000/api/users/${id}`, config)
    dispatch({
      type: "USER_DETAILS_SUCCESS",
      payload: data
    })


  } catch (error) {
    dispatch({ type: "USER_DETAILS_FAIL", payload: error.message })
  }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_PROFILE_REQUEST"
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        "Content-Type": "applicatin/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(`http://localhost:5000/api/users/profile`, user, config)
    dispatch({
      type: "USER_UPDATE_PROFILE_SUCCESS",
      payload: data
    })

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({ type: "USER_UPDATE_PROFILE_FAIL", payload: error.message })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_LIST_REQUEST"
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        "Content-Type": "applicatin/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`http://localhost:5000/api/users`, config)
    dispatch({
      type: "USER_LIST_SUCCESS",
      payload: data
    })

  } catch (error) {
    dispatch({ type: "USER_LIST_FAIL", payload: error.message })
  }
}


export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_DELETE_REQUEST"
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        "Content-Type": "applicatin/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.delete(`http://localhost:5000/api/users/${id}`, config)
    dispatch({
      type: "USER_DELETE_SUCCESS",
    })

  } catch (error) {
    dispatch({ type: "USER_DELETE_FAIL", payload: error.message })
  }
}




export const updateUSer = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "USER_UPDATE_REQUEST",
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(` http://localhost:5000/api/users/${order._id}`, order, config)

    dispatch({
      type: "USER_UPDATE_SUCCESS",
    })

     dispatch({
      type: "USER_DETAILS_SUCCESS", payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload: message,
    })
  }
}