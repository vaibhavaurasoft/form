import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import StepData from "./step";

const FormListPage = () => {
  const [savedForms, setSavedForms] = useState([]);

  useEffect(() => {
    const fetchSavedForms = async () => {
      try {
        const response = await api.get("/bankformlayout");
        if (response.status === 200) {
          const data = response.data.data;
          setSavedForms(data);
        } else {
          console.error("Failed to fetch saved forms");
        }
      } catch (error) {
        console.error("Error fetching saved forms:", error);
      }
    };

    fetchSavedForms();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Form List</h1>
      {/* Render the StepData component and pass the savedForms prop */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              {/* <th>Form Name</th> */}
              <th>Bank Name</th> 
            </tr>
          </thead>
          <tbody>
            {savedForms.map((layout) => (
              <tr key={layout._id}>
                {/* <td>{layout.name}</td> */}
                <td>
                  {layout.bankId ? (
                    <Link to={`/all-forms/${layout._id}`}>
                      {layout.bankId.bankname}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormListPage;
