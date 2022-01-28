import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import Home from "./screens/Home.screen";
import Product from "./screens/Product.Screen";
import Cart from "./screens/Cart.screen";
import Loginscreen from "./screens/Loginscreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileSCreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import placeorderScreen from "./screens/PlceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserList from "./screens/UserList.screen";
import UserEdit from "./screens/UserEdit.screen";





const App = () => {
  return (

    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/product/:id" exact component={Product}/>
          <Route path="/cart/:id?" exact component={Cart}/>
          <Route path="/login" exact component={Loginscreen}/>
          <Route path="/register" exact component={RegisterScreen}/>
          <Route path="/profile" exact component={ProfileScreen}/>
          <Route path="/shipping" exact component={ShippingScreen}/>
          <Route path="/payment" exact component={PaymentScreen}/>
          <Route path="/placeorder" exact component={placeorderScreen}/>
          <Route path="/order/:id" exact component={OrderScreen}/>
          <Route path='/admin/userList' exact component={UserList}/>
          <Route path='/admin/user/:id/edit' exact component={UserEdit}/>

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
