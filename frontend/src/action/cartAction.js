import axios from "axios";

export const addCart = (id, qty) => async (dispach, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
  dispach({
    type: "CART_ADD_ITEM",
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart=(id)=>(dispach,getState)=>{
  dispach({
    type: "CART_REMOVE_ITEM",
    payload: id
  })

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}