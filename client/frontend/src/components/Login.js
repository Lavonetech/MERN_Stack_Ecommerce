import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5002/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        document.cookie = `jwt=${token}; path=/; max-age=${60 * 60 * 24}`;
        navigate("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("Email or Password incorrect. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="col-md-4 login-form">
      <Form style={{padding:'10px 10px 5px 10px'}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button onClick={handleSubmit} variant="primary" type="submit">
          Submit
        </Button>
        {error && <div className="error-message">{error}</div>}
      </Form>
    </div>
  );
}

export default LoginForm;
