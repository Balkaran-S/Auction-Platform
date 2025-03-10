import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

function PostAuction() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState(0);
  const [closingTime, setClosingTime] = useState("");
  const [itemImage, setItemImage] = useState("");
  const navigate = useNavigate();

  const handlePostAuction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be signed in to post an auction.");
      navigate("/signin");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/auction",
        { itemName, description, startingBid, closingTime, itemImage },
        { headers: { Authorization: `Bearer ${token}` } } // Send token in headers
      );

      alert("Auction item posted!");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to post auction. Please try again.");
      // setEror(err.message)
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center py-5 min-vw-100 bg-dark">
        <div
          className=" card d-flex p-4 text-white border rounded-3 w-50"
          style={{ background: "#111" }}
        >
          <h3 className="text-center fw-bold">Post an Auction</h3>

          <p className="text-center">Enter details</p>

          <Form onSubmit={handlePostAuction}>
            <Form.Group className="d-flex flex-column align-items-start">
              <p className="mb-1">Item Name</p>
              <Form.Control
                type="text"
                placeholder="Enter Item Name"
                className="bg-dark text-white border mb-4"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column align-items-start">
              <p className="mb-1">Item Description</p>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                className="bg-dark text-white border mb-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column align-items-start">
              <p className="mb-1">Starting Bid</p>
              <Form.Control
                type="number"
                placeholder="Enter Starting Bid"
                className="bg-dark text-white border mb-4"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column align-items-start">
              <p className="mb-1">Closing Time</p>
              <Form.Control
                type="datetime-local"
                placeholder="Enter Closing Time"
                className="bg-dark text-white border mb-4"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="d-flex flex-column align-items-start">
              <p className="mb-1">Item Image URL</p>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                className="bg-dark text-white border mb-4"
                value={itemImage}
                onChange={(e) => setItemImage(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" className="w-50" type="submit">
              Continue
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PostAuction;
