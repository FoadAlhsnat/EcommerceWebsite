import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button,Form } from 'react-bootstrap'
import Rating from '../components/Rating.component'
import { listProductDetails, } from '../action/productAction'
import Loader from '../components/Loader.component'
import Messeage from '../components/Messeage'

const Product = ({ history,match }) => {
  const [qty, setQut] = useState(1)
  const dispatch = useDispatch()
  const ProductDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = ProductDetails;
  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
    // eslint-disable-next-line
  }, [dispatch, match])

  const addToCart=()=>{
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      {
        loading ? <Loader /> :
          error ? <Messeage variant="danger"></Messeage> :
            <Row>
              <Col className="my-3 " md={6}>
                <Image rounded src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating ? product.rating : 0} text={`${product.numReviews ? product.numReviews : 0} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Price:${product.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description:${product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup >
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Price:
                        </Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item >
                      <Row>
                        <Col>
                          Status:
                        </Col>
                        <Col>
                          {
                            product.countInStock ? "In Stock" : "Out of Stock"
                          }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {
                      product.countInStock>0&&(
                        <ListGroup.Item>
                          <Row>
                            <Col>
                            Qty
                            </Col>
                            <Col>
                            <Form.Control as="select" value={qty} onChange={e=>setQut(e.target.value)}>
                              {
                              [...Array(product.countInStock).keys()].map(x=>(
                                <option key={x+1} value={x+1}>{x+1}</option>
                              ))}
                            
                            </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )
                    }

                    <ListGroup.Item className="d-grid gap-2" >
                      <Button
                      onClick={addToCart}
                      variant="primary" size="md" disabled={product.countInStock === 0}>
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
      }

      <Link className="btn btn-info p-3 rounded " to="/">go Backe</Link>
    </>
  )
}

export default Product
