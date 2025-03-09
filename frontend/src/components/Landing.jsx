import React from 'react'

export default function Landing() {
  return (
    <>
            <div className="text-center my-4 py-5 px-3 " style={{ backgroundColor: '#09090B' }}>
        <h1 className="fw-bold py-2" id='titl'>Auction Master </h1>
                <p className="text-secondary py-3 fs-5">
          Discover unique items, place bids, and win exciting auctions from the comfort of your home.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <a href="#"> <button className="btn btn-light">Start Bidding</button>  </a>
          <a href="/signup"><button className="btn btn-dark">Create Account</button></a>
          
        </div>


      </div>
      <div className="text-center px-5  py-5" style={{ backgroundColor: '#0F0F11' }}>
        <h2 className="fw-bold">How It Works</h2>
        <div className="row mt-4 gap-2">

          <div className="col">
            <div className="p-4 text-white rounded" style={{ backgroundColor: '#242424' }}>
              <h5>Create an Account</h5>
              <p>Sign up for free and set up your profile to start participating in auctions.</p>
            </div>
          </div>

          <div className="col">
            <div className="p-4  text-white rounded" style={{ backgroundColor: '#242424' }}>
              <h5>Browse Auctions</h5>
              <p>Explore a wide range of items up for auction across various categories.</p>
            </div>
          </div>

          <div className="col">
            <div className="p-4  text-white rounded " style={{ backgroundColor: '#242424' }}>
              <h5>Bid & Win</h5>
              <p>Place competitive bids on items you love and win exciting auctions.</p>
            </div>
          </div>
        </div>


      </div>
      <div className='border-bottom border-secondary mt-5' style={{ backgroundColor: '#09090B' }}>
        <h2 className='fw-bold'>Ready to Start Bidding?</h2 >
        
        <p className="text-secondary py-2 fs-5">
        Join thousands of users who find unique items and great deals every day.
        </p>
        <button className="btn btn-light mb-5 ">Get Started</button>
      </div>

    </>
  )
}
