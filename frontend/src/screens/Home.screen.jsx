import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.component'
import Messeage from '../components/Messeage'
import Loader from '../components/Loader.component'
import { listProducts } from '../action/productAction'


const Home = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])



  return (
    <React.Fragment>
      <h1>latsetproducts</h1>
      {
        loading ?
          <Loader /> :
          error ?
            <Messeage variant="danger ">{error}</Messeage> :
            <Row>
              {
                products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                    <Product product={product} />
                  </Col>
                ))
              }
            </Row>

      }

    </React.Fragment>
  )
}

export default Home
