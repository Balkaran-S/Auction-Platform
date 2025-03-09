import Landing from './components/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup';
import Signin from './components/signin';
import Navibar from './components/Navibar';
import Dashboard from './components/Dashboard';
import PostAuction from './components/PostAuction';
import AuctionItem from './components/AuctionItem';


function App() {
  return (
    <BrowserRouter >
      
        <div className='container-fluid text-light w-100 min-vh-100 px-0 ' style={{backgroundColor: '#09090B'}}>
          <Navibar/>

          <main>
            <Routes >
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/auction/:id" element={<AuctionItem/>} />
            <Route path="/post-auction" element={<PostAuction/>} /> 
            </Routes>

          </main>
          <footer className='mt-4 pb-4 text-secondary-subtle' >
            <p >&copy; 2024 Auction App. All rights reserved.</p>
          </footer>
        </div>
      
    </BrowserRouter>
  )
}

export default App