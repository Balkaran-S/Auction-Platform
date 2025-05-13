import React from 'react'

export default function About() {
  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center py-5 min-vw-100 bg-dark">
      <div
        className="card d-flex flex-column p-4 text-white border rounded-3 w-75"
        style={{ background: '#111' }}
      >
        <h3 className="text-center fw-bold mb-3">About Auction Master</h3>
        <p className="text-center">
          Auction Master is a platform designed to simplify the auction experience. Whether you're a seller listing valuable items or a bidder seeking the best deals, our system ensures smooth, transparent, and real-time bidding.
        </p>
        <p className="text-center">
          Our mission is to make online auctions secure, accessible, and enjoyable for everyone.
        </p>
        <p className="text-center">
          Built using the MERN stack, our platform emphasizes performance, reliability, and user satisfaction.
        </p>
      </div>
    </div>
    </div>
  )
}
