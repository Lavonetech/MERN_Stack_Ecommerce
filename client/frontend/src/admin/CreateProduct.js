import React, { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";

const CreateProduct = () => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [orderId, setOrderId] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleProduct=(e)=>{
    setProduct(e.target.value);
  }
  const handlePrice=(e)=>{
    setPrice(e.target.value);
  }
  const handleId=(e)=>{
    setOrderId(e.target.value);
  }
  const handleDescription=(e)=>{
    setDescription(e.target.value);
  }
  const handleBrand=(e)=>{
    setBrand(e.target.value);
  }
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleUpload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('Image', file);

  //     const response = await axios.post('http://localhost:5002/upload', formData);

  //     console.log('File uploaded successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
     formData.append('Image', file);
     formData.append('orderId', orderId);
     formData.append('name', product);  // Add product name
     formData.append('price', price);  // Add product price
     formData.append('brand', brand);
     formData.append('description', description);

      const response = await axios.post("http://localhost:5002/createproduct",formData)
      
        console.log("Successful",response.data);
        window.location.href = "/createproduct";
      
    } catch (error) {
      setErrorMessage(
        "You cannot create a product. Please contact the developer"
      );
      console.error(error);
    }
  };

  return (
    <div className="col-md-12 wrapper">
      <div className="inner">
        <Form>
          <h3>Create a product</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          

          <div className="form-group">
            <div className="form-wrapper">
              <Form.Label>Product Id</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text>
                  <i className="zmdi zmdi-account-o"></i>
                </InputGroup.Text>
                <FormControl type="text" value={orderId} onChange={handleId} />
              </InputGroup>
            </div>
            <div className="form-wrapper">
              <Form.Label>Product Name</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text>
                  <i className="zmdi zmdi-account-o"></i>
                </InputGroup.Text>
                <FormControl type="text" value={product} onChange={handleProduct} />
              </InputGroup>
            </div>
          </div>
          <div className="form-group">
            <div className="form-wrapper">
              <Form.Label>Product Price</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text>
                  <i className="zmdi zmdi-account-o"></i>
                </InputGroup.Text>
                <FormControl type="text" value={price} onChange={handlePrice} />
              </InputGroup>
            </div>
            <div className="form-wrapper">
              <Form.Label>Product Brand</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text>
                  <i className="zmdi zmdi-account-o"></i>
                </InputGroup.Text>
                <FormControl type="text" value={brand} onChange={handleBrand} />
              </InputGroup>
            </div>
          </div>
          <div className="form-group">
            <div className="form-wrapper">
              <Form.Label>Product Description</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text>
                  <i className="zmdi zmdi-account-o"></i>
                </InputGroup.Text>
                <FormControl as="textarea" rows={5}value={description} onChange={handleDescription}accept="image/*" />
              </InputGroup>
            </div>
          </div>
          <div className="form-group">
            <div className="form-wrapper">
              <Form.Label>Product Image</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text>
                  <i className="zmdi zmdi-account-o"></i>
                </InputGroup.Text>
                <FormControl type="file" onChange={handleFileChange}accept="image/*" />
              </InputGroup>
            </div>
          </div>

          <div className="form-end">
            <div className="button-holder">
              <Button onClick={handleSubmit}>Create Product</Button>
            </div>
          </div>
        </Form>

      
      </div>
      {/* <h2>Image Upload</h2>
       
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button onClick={handleUpload }type="submit">Upload</button> */}
      
    </div>
  );
};

export default CreateProduct;
