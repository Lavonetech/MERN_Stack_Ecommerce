import { useContext } from 'react';



import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../components/Store';
import { ListGroup,Col,Card,Button,Row } from 'react-bootstrap';

export default function Cart() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
 
 
 
  const checkoutHandler = () => {
    navigate('/checkout');
  };
 
  const subTotalHandler =()=>{
    let total=0;
    state.cart.cartItems.forEach((sub )=> {
       total+=sub.price;
    
    });
    return total;
  }
  return (
    <div>


    <div className="cart">
     
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={6}>
          {state.cart.cartItems.length === 0 ? (
           
             <div> Cart is empty. <Link to="/">Go Shopping</Link></div> 
            
          ) : (
            <ListGroup>
              {state.cart.cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                       src={`http://localhost:5002/${item.image}`}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />{' '}
                    </Col>
                   
                    <Col md={3}>
                
                    <div style={{
                  textDecoration: "none !important",
                  listStyle: "none",
                  color: "#000",
                  fontSize: "18px",}}
                  >{item.name}</div>
                      {item.stock ? <div className='stock-a'> Stock available</div> :<div className="stock-n">Stock not available</div>}
                    </Col>
                   <Col className='product-price'>   Rs.{item.price}</Col>
                    {/* <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col> */}
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal
                    Rs. { subTotalHandler()}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div >
                    <Button
                    style={{width:"100%"}}
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={state.cart.cartItems.length === 0}
                    >
                     Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
  );
}