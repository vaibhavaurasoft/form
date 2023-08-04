import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./addbank.css";
import api from "../../api/api";

const AddBankPage = () => {
  const history = useNavigate();
  const [bankname, setBankName] = useState("");
  const [location, setLocation] = useState("");
  const [Banks, setBanks] = useState([]);

  const handleAddBank = async () => {
    try {
      const response = await api.post("/bank", { bankname, location });
      if (response.ok) {
        // Bank added successfully
        history.push("/banks"); 
      } else {
        // Handle error
        console.error("Failed to add bank:", response.status);
      }
    } catch (error) {
      console.error("Error adding bank:", error);
    }
  };
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await api.get("/bank");
        if (response.status === 200) {
          const data = response.data.data;
          setBanks(data);
        }
      } catch (error) {
        console.error("Failed to fetch banks:", error);
      }
    };

    fetchBanks();
  }, []);
useEffect(()=>{

},[handleAddBank])
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Add Bank</h2>
          <Form>
            <Form.Group controlId="bankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bank name"
                value={bankname}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" className="m-2" onClick={handleAddBank}>
              Add Bank
            </Button>
          </Form>
        </div>
        <div className="col-md-6 bg-dark">
          <div className="bank-list-sidebar">
            <h2>Bank List</h2>
            <ul className="list-unstyled">
              {Banks &&
                Banks.map((bank, index) => (
                  <Link to={`/bank-details/${bank._id}`}>
                    <li key={index} value={bank._id}>
                      {bank.bankname}
                    </li>
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBankPage;
