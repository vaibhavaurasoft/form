import React, { useState, useEffect } from "react";

// import "./FormBuilder.css";
import api from "../api/api";
import { useParams } from "react-router-dom";

const FormBuilder = () => {
  // State variables
  const {bankId}  = useParams();
  

  const [openPopup, setOpenPopup] = useState(false);
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [formData, setFormData] = useState();
  const [layouts, setLayouts] = useState([]);
  const stepname = localStorage.getItem("activeStep");
  const [selectedBankId, setSelectedBankId] = useState("");


  // Handle resetting the form
  const handleResetForm = () => {
    setFields([]);
    setFormData({});
    setFormName("");
  };

  // Fetch layouts on component mount
  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const response = await api.get("/bankformlayout");
        if (response.status === 200) {
          const data = response.data.data;
          setLayouts(data);
        } else {
          console.error("Failed to fetch layouts");
        }
      } catch (error) {
        console.error("Error fetching layouts:", error);
      }
    };

    fetchLayouts();
  }, []); 
  // Handle loading a layout
  const handleLoadLayout = async (layoutId) => {
    try {
      // const response = await api.get(`/bankformlayout/${layoutId}`);
      const response = await api.get(`/bankformlayout/${bankId}`);
      // const response = await api.get(
      //   `/bankformlayout/64ca4c5b1386285eea0034cd`
      // );

      const loadedLayout = response.data.data; 
      // Set the selected bank ID and form fields according to the loaded layout
      setSelectedBankId(loadedLayout.bankId?._id || "");
      const loadedFields = loadedLayout.steps.find(
        (step) => step.stepNumber === stepname
      ).fileds;
      setFields(loadedFields);
    } catch (error) {
      console.error("Error loading layout:", error); 
    }
  };
useEffect(()=>{
handleLoadLayout()
},[stepname])

  // Fetch layout on selected bank or step change
  useEffect(() => {
    const fetchLayout = async () => {
      if (selectedBankId && stepname) {
        await handleLoadLayout(selectedBankId);
      }
    };

    fetchLayout();
  }, [selectedBankId, stepname]);

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormName((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // Render the form fields
  const renderFields = () => {
    return fields.map((field, index) => (
      <div key={index} className="form-field">
        <label>
          {field.label}
        </label>
        {renderInput(field, index, field.label)}
      </div>
    ));
  };

  // Render input based on field type
  const renderInput = (field, index, label) => {
    switch (field.type) {
      case "input-text":
        return (
          <input
            type="text"
            name={label}
            className="form-control"
            onChange={(event) => handleInputChange(label, event.target.value)}
          />
        );
      case "input-image":
        return (
          <input
            type="file"
            name={label}
            className="form-control"
            onChange={(event) => handleInputChange(label, event.target.value)}
          />
        );
     
      case "input-dropdown":
        return (
          <div key={index} className="form-field">
            {/* <label>Input Dropdown</label> */}
            <select
              className="form-control"
              onChange={(event) =>
                handleInputChange(
                  "input-dropdown",
                  event.target.value,
                  field.label
                )
              }
            >
              {field.options?.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      // Add cases for other field types here...
      default:
        return null;
    }
  };

  // Handle saving form data
  const handleSaveData = async () => {
    try {
      const dataToSave = {
        formName: formName,
        formData: { ...formData },
      };
      console.log("Form data saved successfully!", dataToSave);

      await api.post("/formdata", dataToSave);

      console.log("Form data saved successfully!");
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };


  const formContainerClass = openPopup
    ? "form-container animated shake"
    : "form-container";
  return (
    <div className="form-builder container">
      <div className={`${formContainerClass} border-warning w-75 p-4 bg-light`}>
        {renderFields()}

        <div className="form-buttons mt-3">
          <button onClick={handleResetForm} className="btn btn-danger ms-2">
            Reset Form
          </button>
        </div>
        <button onClick={handleSaveData} className="btn btn-info mt-3">
          Log Data
        </button>

        <div className="mt-3">
          <h4>Saved Layouts:</h4>
          <ul className="list-unstyled">
            <button
              className="btn btn-warning m-1"
              onClick={() => handleLoadLayout()}
            >
            Show fileds
            </button>
            {/* {layouts.map((layout, index) => (
              <li key={index}>
                <button
                  className="btn btn-warning m-1"
                  onClick={() => handleLoadLayout(layout._id)}
                >
                  {layout.bankId.bankname}
                </button>
              </li>
            ))} */}
          </ul>
        </div>
        {/* {layouts.length > 0 && (
          <div className="mt-3">
            <button onClick={deleteAllLayout} className="btn btn-danger">
              Delete All Layout
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FormBuilder;


