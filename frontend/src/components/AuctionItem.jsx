import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";

function AuctionItem() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [bid, setBid] = useState(0);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/auctions/${id}`);
        setItem(res.data);
      } catch (error) {
        setMessage(
          "Error fetching auction item: " + error.response?.data?.message ||
            error.message
        );
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);

  const handleBid = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be signed in to post an auction.");
      navigate("/signin");
      return;
    }
    if (bid <= item.currentBid) {
      setMessage("*Bid must be higher than the current bid.");
      return;
    }
    

    try {
      const res = await axios.post(`http://localhost:5001/bid/${id}`, {
        bid,
        username,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage(res.data.message);
      if (res.data.winner) {
        setMessage(`Auction closed. Winner: ${res.data.winner} Navigating to Dashboard.`);
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage("Error placing bid.");
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5 min-vw-100 bg-dark">
      <Card
        className="  d-flex p-4 text-white border rounded-3 w-50 d-flex justify-content-center align-items-center"
        style={{ background: "#111" }}
      >
        <Card.Img
          variant="top"
          src={item.itemImage}
          style={{
            width: "50%",
            objectFit: "cover",
            backgroundColor: "#24302f",
          }}
        />

        <h2 className="p-4">{item.itemName}</h2>
        <p className="text-secondary">{item.description}</p>

        <p>Current Bid: $ {item.currentBid}</p>
        <p>Highest Bidder - {item.highestBidder || "No bids yet"} </p>
        <p>Closing Time: {new Date(item.closingTime).toLocaleString()}</p>

        <Form.Control
          type="number"
          placeholder="Enter your Bid"
          className="bg-dark text-white border mb-4 w-50"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
          required
        />
        <Button variant="primary" className="mb-4" onClick={handleBid}>
          Continue
        </Button>
        {message && <p className="message" style={{ color: 'red' }}>{message}</p>}

      </Card>
    </div>
  );
}

export default AuctionItem;
