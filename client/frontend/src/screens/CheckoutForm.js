import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../components/Store';
import Box from '@mui/material/Box';
import {  Button, Card, ListGroup } from 'react-bootstrap';


const CheckoutForm = () => {
  const { state } = useContext(Store);
  const [error, setError] = useState(null);
  const [tokenUser,setTokenUser]=useState('');

  const calculateTotal = () => {
    let total = 0;
    state.cart.cartItems.forEach((item) => {
      total += item.price;
    });
    return total;
  };
  useEffect(()=>{
    let tokenUser=()=>{
      try{
        const cookie=document.cookie;
        const token=cookie.split(';').find((cookie)=>cookie.trim().startsWith("jwt="));
        if(token){
          const tokenValue=token.split('=')[1];
          const jwtToken = JSON.parse(atob(tokenValue.split('.')[1]));
          const user=jwtToken.user;
          setTokenUser(user);
        }
      }catch(e){
        console.error(e)
      }
      
    }
    tokenUser();
  },[])
 

  return (
    <div>
      <div className="col-lg-12 col-md-6 product">
        {error && <div className="error-message">{error}</div>}

        <div className='product-det'>
          {state.cart.cartItems.map((item) => (
            <Box
              key={item.id}
              className="checkout-item"
             
              display="flex"
              border={1}
              borderColor="#ccc"
              p={3}
              m={2}
              boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
            >
              <div className="image-section">
                <img src={item.image} loading="lazy" alt={item.name} />
              </div>
              <div className="details-section">
                <div style={{fontSize:'28px'}}>{item.name}</div>
                <h5 className='desc'>{item.description}</h5>
                <h4 className='product-price'>Rs. {item.price}</h4>
                <div>
                <form method="post" action="https://sandbox.payhere.lk/pay/checkout">
  <input type="hidden" name="merchant_id" value="1223543" />
  <input type="hidden" name="return_url" value="http://sample.com/return" />
  <input type="hidden" name="cancel_url" value="http://sample.com/cancel" />
  <input type="hidden" name="notify_url" value="localhost:3000/notify_url" />
  
  <input type="hidden" name="order_id" value={item.orderId} style={{ fontSize: "18px" }} />
  <input type="hidden" name="items" value="Door bell wireless" style={{ fontSize: "18px" }} />
  <input type="hidden" name="currency" value="LKR" style={{ fontSize: "18px" }} />
  <input type="hidden" name="amount" value={item.price} style={{ fontSize: "18px" }} />
  
  <input type="hidden" name="first_name" value="Saman" style={{ fontSize: "18px" }} />
  <input type="hidden" name="last_name" value="Perera" style={{ fontSize: "18px" }} />
  <input type="hidden" name="email" value="samanp@gmail.com" style={{ fontSize: "18px" }} />
  <input type="hidden" name="phone" value="0771234567" style={{ fontSize: "18px" }} />
  <input type="hidden" name="address" value="No.1, Galle Road" style={{ fontSize: "18px" }} />
  <input type="hidden" name="city" value="Colombo" style={{ fontSize: "18px" }} />
  <input type="hidden" name="country" value="Sri Lanka" />
  <input type="hidden" name="hash" value={item.hash} style={{ fontSize: "18px" }} />
  
  <input type="submit" value="Checkout" style={{ fontSize: "18px",background:"#f85606",color:"#fff",marginTop:'1rem'}} />
</form>

                </div>
              </div>
              
            </Box>
            
          ))}
         
        </div>
        {
          tokenUser && <div style={{width:'40%',height:'50vh',border:'none'}}className='card'>
            <Card >
            <Card.Body>
              <ListGroup variant="flush">
              <ListGroup.Item>
                  <h1>Shipping Details</h1>
                 <div>{tokenUser.firstName}{''}{tokenUser.lastName}</div>
                 <div>{tokenUser.address}</div>
                <div>{tokenUser.country}</div>
                 <div>{tokenUser.zipcode}</div>
                 <div>{tokenUser.phone}</div>
                 <Button>Edit Details</Button>
                </ListGroup.Item>
            
              </ListGroup>
            </Card.Body>

          </Card>
          </div>
        }
        
      </div>
    </div>
  );
};

export default CheckoutForm;
