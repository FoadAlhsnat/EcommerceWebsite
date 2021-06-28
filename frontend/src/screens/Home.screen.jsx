import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

import Product from '../components/Product.component'
import axios from 'axios'


const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetchProducts()
  }, [])


  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://127.0.0.1:5000/api/products')
      setProducts(data)
      console.log(data);
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <React.Fragment>
      <h1>latsetproducts</h1>
      <Row>
        {
          products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
              <Product product={product} />
            </Col>
          ))
        }
      </Row>
    </React.Fragment>
  )
}

export default Home
