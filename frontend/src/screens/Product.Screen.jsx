import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating.component'
import axios from 'axios'

const Product = ({ match }) => {
  const [item,SetItem]=useState({})
  useEffect(() => {
    fetchProduct()
    // eslint-disable-next-line
  }, [])

  const fetchProduct=async ()=>{
    const param=match.params.id
    try {
      const res= await axios.get(`http://127.0.0.1:5000/api/products/${param}`)
      console.log(res);
      SetItem(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  // const item = products.find(p => p._id === match.params.id);
  return (
    <>

      <Row>
        <Col className="my-3" md={6}>
          <Image rounded src={item.image} alt={item.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{item.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={item.rating}  text={`${item.numReviews?item.numReviews:0} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price:${item.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description:${item.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col  md={3}>
          <Card>
          <ListGroup >
            <ListGroup.Item>
              <Row>
                <Col>
                  Price:
                </Col>
                <Col>
                  <strong>${item.price}</strong>
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
                    item.countInStock ? "In Stok" : "Out of Staock"
                  }
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className="d-grid gap-2" >
              <Button variant="primary"  size="lg" disabled={item.countInStock===0}>
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
          </Card>
        </Col>
      </Row>
      <Link className="btn btn-info p-3 rounded " to="/">go Backe</Link>
    </>
  )
}

export default Product
