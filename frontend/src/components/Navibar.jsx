import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';

export default function Navibar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/signin');
  };
  return (
    <>
      <nav class=' navbar d-flex justify-content-between px-5 py-3' >
              <h1  >Auction Master</h1>
              <div class="">
                <a class="navbar-brand text-light" href="/">Home</a>
                <a class="navbar-brand text-light" href="/about">About</a>
                <a class="navbar-brand text-light" href="/contact">Contact</a>
                <a class="navbar-brand text-light" href="./signup">Signup</a>
                <a class="navbar-brand text-light" href="./signin">Signin</a>
                <button className="btn btn-light m-3">
                  <a href="/dashboard" className='text-decoration-none text-black'>Dashboard</a>
                  </button>
              </div>
              
            </nav>
    </>
  )
}
