// ProductDetails.js
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Store } from "../components/Store";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ProductDetails = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/product`); // Fetch product by ID
        const selectedProduct = response.data.find((item)=>item.id===id);  
        if (selectedProduct) {
          setProduct(selectedProduct);
        } else {
          console.log("Product not found.");
        }
      } catch (e) {
        console.log("Server error", e);
      }
    };

    getProductById();
  }, [id]);

  const addToCartHandler = () => {
    if (product) {
      ctxDispatch({
        type: "CART_ADD_ITEM",
        payload: {
          name: product.name,
          price: product.price,
          orderId: product.orderId,
          description: product.description,
          image:product.image,
          stock:product.stock
        },
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
const stock=product.stock;
  return (
    <div id="product">
      <Row className="align-items-center">
        <Col md={4}>
          <div className="product-image">
            <img src={`http://localhost:5002/${product.image}`} alt="Product Image" />
          </div>
        </Col>
        <Col md={6} className="product-details">
          <div className="product-name">{product.name}</div>
          <div className="desc">{product.description}</div>
          <div className="stock">
            <div>
            {
            stock ? <div className="stock-a">Stock available</div>:<div className='stock-n'>Stock not available</div>
          }
            </div>
            <div className="increment">
              <button>-</button>
              <input id="input" type="number" value="0"/>
              <button>+</button>
            </div>
          </div>
          
          <div className="product-price">Rs. {product.price}</div>
          <div className="button">
            <Button variant="danger" size="md">
              Buy Now
            </Button>

            <Button onClick={addToCartHandler} variant="primary" size="md">
              Add to cart
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
