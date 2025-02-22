import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signin() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign-in logic here
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <form className='container-fluid p-3' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}
