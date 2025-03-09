import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Card } from "react-bootstrap";
import axios from 'axios';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const  handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5001/signup', { username, password });

            alert('Signup successful! Please sign in.');
        }
        catch (err) {
            console.error('Signup Error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        }
    };



    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center py-5 min-vw-100 bg-dark">
                <Card className="d-flex p-4 text-white border rounded-3 w-50" style={{ background: "#111" }}>
                    <h3 className="text-center fw-bold " >Auction Master</h3>
                    <h5 className="text-center my-3">Sign up</h5>
                    <p className="text-center">Create your account</p>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className=" d-flex flex-column align-items-start">
                            <p className='mb-1'>Username</p>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                className="bg-dark text-white border mb-4 "
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                   

                        <Form.Group className="d-flex flex-column align-items-start">
                            <p className='mb-1'>Password</p>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                className="bg-dark text-white border mb-4 "
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" className="mt-4 w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card>
            </Container>
        </div>
    );
}
