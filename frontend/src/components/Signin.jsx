import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Container, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/signin", {
        username,
        password,
      });
      console.log("Signin Response:", res.data);

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        alert("Sign in successful!");
        nav("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Signin Request Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center py-5 min-vw-100 bg-dark">
        <Card
          className="d-flex p-4 text-white border rounded-3 w-50"
          style={{ background: "#111" }}
        >
          <h3 className="text-center fw-bold">Auction Master</h3>
          <h5 className="text-center my-3">Log in</h5>
          <p className="text-center">Enter your credentials</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="d-flex flex-column align-items-start">
              <p className="mb-1">Username</p>
              <Form.Control
                type="text"
                placeholder="Enter your Username"
                className="bg-dark text-white border mb-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="d-flex flex-column align-items-start">
              <p className="mb-1">Password</p>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                className="bg-dark text-white border mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <div>
                <span>Need an Account? </span>
                <a
                  href="/signup"
                  className="text-white fw-bold text-decoration-none"
                >
                  {" "}
                  Sign up
                </a>
              </div>

              <a href="#" className="text-white">
                Forgot password?
              </a>
            </div>

            <Button variant="primary" className="w-100" type="submit">
              Continue
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}
