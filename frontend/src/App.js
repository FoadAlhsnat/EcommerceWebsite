import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import Home from "./screens/Home.screen";
import Product from "./screens/Product.Screen";


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
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
