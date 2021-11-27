import axios from "axios"

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_CREATE_REQUEST"
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        "Content-Type": "applicatin/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(`http://localhost:5000/api/orders`, order, config)
    console.log(data+" foad");
    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data
    })
  } catch (error) {
    dispatch({ type: "ORDER_CREATE_FAIL", payload: error.message })
  }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_DETAILS_REQUEST"
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, config)
    dispatch({
      type: "ORDER_DETAILS_SUCCESS",
      payload: data
    })
  } catch (error) {
    dispatch({ type: "ORDER_DETAILS_FAIL", payload: error.message })
  }
}