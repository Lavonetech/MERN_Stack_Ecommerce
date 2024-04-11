import React, { useReducer, useState } from "react";
import axios from "axios";
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = useNavigate();
  const [successMessage,setSuccessMessage] =useState("");
  const [errorMessage,setErrorMessage] =useState("");
  const [loading, setLoading] =useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5002/signup", {
        firstName,
        lastName,
        phone,
        address,
        city,
        country,
        email,
        password,
      });
       
      if(response.status===200 || response.status===201){
      
        setSuccessMessage("registration successful");
        setFirstName("");
        setLastName("");
        setPhone("");
        setAddress("");
        setCity("");
        setCountry("");
        setEmail("");
        setPassword("");

        window.location.href="/login";
      }
          
    } catch (error) {
      setErrorMessage("You can not register now.Please check infomation again")
      console.error(error);
    }
  };

  return (
    <div>
      <div className=" col-md-6 message">
      {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

        
     
      <div className="col-md-12 wrapper">
      <div className="inner">
        <Form action="">
          <h3>Registration Form</h3>
          <div className="form-group">
            <div className="form-wrapper">
              <Form.Label>First Name:</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text 
                ><i className="zmdi zmdi-account-o"></i></InputGroup.Text>
                <FormControl type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
              </InputGroup>
            </div>
            <div className="form-wrapper">
            <Form.Label>Last Name:</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text><i className="zmdi zmdi-account-o"></i></InputGroup.Text>
                <FormControl type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
              </InputGroup>
            </div>
          </div>
          <div className="form-group">
            <div className="form-wrapper">
              <Form.Label>Phone Number:</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text><i className="zmdi zmdi-account-o"></i></InputGroup.Text>
                <FormControl type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
              </InputGroup>
            </div>
            <div className="form-wrapper">
            <Form.Label>Home Address:</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text><i className="zmdi zmdi-account-o"></i></InputGroup.Text>
                <FormControl type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
              </InputGroup>
            </div>
          </div>
          <div className="form-group">
            <div className="form-wrapper">
              <Form.Label>Country:</Form.Label>
              <InputGroup className="form-holder select">
                <Form.Select value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="sri lanka">Sri Lanka</option>
                  <option value="united states">United States</option>
                  <option value="united kingdom">United Kingdom</option>
                  <option value="newzealand">Newzealand</option>
                </Form.Select >
                <InputGroup.Text><i className="zmdi zmdi-pin"></i></InputGroup.Text>
              </InputGroup>
            </div>
            <div className="form-wrapper">
            <Form.Label>City</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text><i className="zmdi zmdi-account-o"></i></InputGroup.Text>
                <FormControl type="text" value={city} onChange={(e)=>setCity(e.target.value)} />
              </InputGroup>
            </div>
          </div>
          <div className="form-group">
            <div className="form-wrapper">
              <Form.Label>Email Address:</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text><i className="zmdi zmdi-lock-outline">@</i></InputGroup.Text>
                <FormControl type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </InputGroup>
            </div>
            <div className="form-wrapper">
              <Form.Label>Password:</Form.Label>
              <InputGroup className="form-holder">
                <InputGroup.Text><i className="zmdi zmdi-lock-outline"></i></InputGroup.Text>
                <FormControl type="password" placeholder="********" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </InputGroup>
            </div>
          </div>
        
          <div className="form-end">
           
            <div className="button-holder">
              <Button onClick={handleSubmit}>Register Now</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
        
      </div>
  );
}

export default SignupForm;
