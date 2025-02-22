import './App.css'
import Landing from './components/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup';
import Signin from './components/signin';


function App() {
  return (
    <BrowserRouter >
      <div class='container-fluid bg-dark-subtle  p-5'>
        <div class='container-fluid bg-light border px-0 rounded-4 border-dark-subtle overflow-hidden'>
          <header class='bg-primary' >
        

            <nav class="navbar navbar-expand flex ">
              <div class="container-fluid justify-content-start gap-2 px-4">
                <a class="navbar-brand" href="/">Home</a>
                <a class="navbar-brand" href="#">About</a>
                <a class="navbar-brand" href="#">Contact</a>
                <a class="navbar-brand" href="./signup">Signup</a>
                <a class="navbar-brand" href="./signin">Signin</a>
              </div>
              
            </nav>
          </header>
          <main>
            <Routes >
              <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auction/:id" element={<AuctionItem />} />
            <Route path="/post-auction" element={<PostAuction />} /> */}
            </Routes>

          </main>
          <footer>
            <p>&copy; 2024 Auction App. All rights reserved.</p>
            <p>Welcome to the best place to buy and sell items through auctions!</p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
