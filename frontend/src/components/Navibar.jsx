import React from 'react'

export default function Navibar() {
  return (
    <>
      <nav class=' navbar d-flex justify-content-between px-5 py-3' >
              <h1  >Auction Master</h1>
              <div class="">
                <a class="navbar-brand text-light" href="/">Home</a>
                <a class="navbar-brand text-light" href="#">About</a>
                <a class="navbar-brand text-light" href="#">Contact</a>
                <a class="navbar-brand text-light" href="./signup">Signup</a>
                <a class="navbar-brand text-light" href="./signin">Signin</a>
                <button className="btn btn-light me-3">
                  <a href="/dashboard" className='text-decoration-none text-black'>Dashboard</a>
                  </button>
              </div>
              
            </nav>
    </>
  )
}
