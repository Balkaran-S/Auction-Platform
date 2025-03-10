import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Navbar,
} from "react-bootstrap";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      nav("/signin"); // Redirect to signin if not authenticated
      return;
    }

    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5001/auctions");
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };
    fetchItems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    nav("/signin"); // Redirect to Sign In page
  };

  //       <Link to="/post-auction">
  //         <button>Post New Auction</button>
  //       </Link>

  //       <ul>
  //         {items.map((item) => (
  //           <li key={item._id}>
  //             <Link to={`/auction/${item._id}`}>
  //               {item.itemName} - Current Bid: ${item.currentBid} {item.isClosed ? '(Closed)' : ''}
  //             </Link>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>

  return (
    <Container
      fluid
      className="text-white border-bottom border-top p-4 "
      style={{ backgroundColor: "#202529" }}
    >
      <div className="d-flex justify-content-between mb-3">
        <h2>Welcome to BidMaster</h2>
        <div className="d-flex  gap-4">
          <Button variant="light" className="mb-3">
            <Link
              to="/post-auction"
              className="text-decoration-none text-black"
            >
              Create New Auction
            </Link>
          </Button>
          <Button variant="light" className="mb-3" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>

      <Nav variant="underline" defaultActiveKey="browse" className="mb-4">
        <Nav.Item>
          <Nav.Link eventKey="browse" className="text-white ">
            Browse Auctions
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="my-auctions" className="text-white ">
            My Auctions
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="my-bids" className="text-white ">
            My Bids
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Row>
        {items.map((item) => (
          <Col md={4} sm={6} className="mb-4 ">
            <Card
              className=" text-white border-light "
              style={{ backgroundColor: "#1c1c1c" }}
            >
              <Card.Img
                variant="top"
                src={item.itemImage}
                style={{ height: "16rem", width: "100%", objectFit: "cover", backgroundColor: "#24302f" }}

                
              />
              <Card.Body className="d-flex align-items-start flex-column">
                <button size={30} className="mb-2"></button>
                <Card.Title className="fs-2">{item.itemName} </Card.Title>
                <Card.Text className="text-secondary">
                  {item.description}
                </Card.Text>
                  <p>Current Bid: {item.currentBid}</p>
                  <p>Highest Bidder - {item.highestBidder}</p>
                
                

                <p>
                  Closing Time: {new Date(item.closingTime).toLocaleString()}
                </p>
                {item.isClosed ? "(Closed)" : ""}

                <Button variant="light">Place Bid</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
