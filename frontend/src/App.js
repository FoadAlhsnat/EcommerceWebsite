import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import Home from "./screens/Home.screen";
import Product from "./screens/Product.Screen";
import Cart from "./screens/Cart.screen";


const App = () => {
  return (

    <Router>
      <Header />
      <main className="py-3">
        <Container>
          {/* <Home/> */}
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/product/:id" exact component={Product}/>
          <Route path="/cart/:id?" exact component={Cart}/>

        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
