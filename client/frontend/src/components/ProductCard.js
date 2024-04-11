import React, { useContext, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Store } from "../components/Store";
import axios from "axios";

const ProductCard = () => {
  const { dispatch: ctxDispatch } = useContext(Store);

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return { ...state, loading: true };

      case "FETCH_SUCCESS":
        return { ...state, products: action.payload, loading: false };

      case "FETCH_FAIL":
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
  };

  const initialState = {
    products: [],
    loading: true,
    error: "",
  };

  const [{ loading, error, products }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST" });

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5002/product");
        dispatch({ type: "FETCH_SUCCESS", payload: response.data }); 
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };

    fetchData();
  }, []);

  const addToCartHandler = (product) => {
    const cartItem = {
      id: product.id,
      orderId:product.orderId,
      name: product.name,
      price: product.price,
      hash:product.hash,
      image: product.image, 
      description: product.description,
    };

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: cartItem,
    });
  };

  return (
    <div className="col-md-12">
      <div className="d-flex flex-wrap justify-content-center">
        {loading ? (
          <div>Loading</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((item) => (
            <Card
              key={item.id} 
              style={{
                width: "17rem",
                margin: "5rem 0 0 1rem",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                transition: "0.3s",
                borderRadius: "8px",
              }}
            >
              <Card.Body>
                <Link to={`/productDetails/${item.id}`}> {/* Make sure this path matches your route */}
                  <Card.Title
                    style={{
                      textDecoration: "none",
                      listStyle:'none',
                      listStyle: "none",
                      color: "#000",
                      fontSize: "18px",
                    }}
                  >
                  <img src={`http://localhost:5002/${item.image}`} alt={item.name} style={{ width:"100%",height:"35vh" }} />
  
                    {item.name}
                  </Card.Title>
                </Link>
                <Card.Text>{item.description.slice(1,50)}...</Card.Text>
                <Card.Text>
                  <strong className="product-price">Rs.{item.price} </strong>
                  <Button
                    onClick={() => addToCartHandler(item)}
                    variant="danger"
                    size="sm"
                    style={{ marginLeft: "10px" }}
                  >
                    Add to cart
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCard;
