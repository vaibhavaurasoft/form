import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
// import "./addbank.css";
import api from ".././api/api"

const AddStep = () => {
  const history = useNavigate();
  const [stepname, setStepname] = useState("");
  const [Banks, setBanks] = useState([]);

  const handleAddBank = async () => {
    try {
      const response = await api.post("/step", { stepname });
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
        const response = await api.get("/step");
        if (response.status === 200) {
          const data = response.data.data;
          setBanks(data);
        }
      } catch (error) {
        console.error("Failed to fetch banks:", error);
      }
    };

    fetchBanks();
  }, [handleAddBank]);
  useEffect(() => {}, [handleAddBank]);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Add Step</h2>
          <Form>
            <Form.Group controlId="stepname">
              <Form.Label>Step Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bank name"
                value={stepname}
                onChange={(e) => setStepname(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" className="m-2" onClick={handleAddBank}>
              Add Step
            </Button>
          </Form>
        </div>
        <div className="col-md-6 bg-dark">
          <div className="bank-list-sidebar">
            <h2>Step List</h2>
            <ul className="list-unstyled">
              {Banks &&
                Banks.map((step, index) => (
                  <h5>
                    <li key={index} value={step._id}>
                      {step.stepname}
                    </li>
                  </h5>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStep;
