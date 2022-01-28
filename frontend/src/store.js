import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productreducers'
import { cartReducer } from './reducers/cartreducer'
import { userLoginReducer, userUpdateProfileReducer, useRegisterReducer, useDitailsReducer } from './reducers/userReducer'
import { orderCreatReducer,orderDetailsReducer ,orderListReducer,orderPayReducer} from './reducers/orderReduscer'
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: useRegisterReducer,
  userDetails: useDitailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate:orderCreatReducer,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer,
  ordersList:orderListReducer,
})

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippindAddressFromStorage = localStorage.getItem('shippingaddress') ? JSON.parse(localStorage.getItem('shippingaddress')) : {}

const initialState = {
  cart: {
    shippingAddress: shippindAddressFromStorage,
    cartItems: cartItemFromStorage,
    
  },
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store