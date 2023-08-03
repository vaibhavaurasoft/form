import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import api from "../api/api";

const FormBuilder = ({ onSaveForm, formLayout }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [layoutName, setLayoutName] = useState("");
  const [formData, setFormData] = useState();
  const [layouts, setLayouts] = useState([]);
  const stepname = localStorage.getItem("activeStep");
  const [Banks, setBanks] = useState([]);
  const [selectedBankId, setSelectedBankId] = useState("");
  const [selectedStepLayout, setSelectedStepLayout] = useState({});

  const handleDrop = (event) => {
    event.preventDefault();
    const field = event.dataTransfer.getData("field");
    setFields((prevFields) => [...prevFields, { type: field, label: field }]);
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

  const handelBankSelect = (event) => {
    const selectedBankId = event.target.value;
    console.log("bankId", selectedBankId);
    setSelectedBankId(selectedBankId);
    const selectedLayout = layouts.find(
      (layout) =>
        layout.bankId._id === selectedBankId &&
        layout.steps.some((step) => step.stepNumber === stepname)
    );
    setSelectedStepLayout(
      selectedLayout?.steps.find((step) => step.stepNumber === stepname)
    );
  };

  const handleFieldLabelChange = (index, newLabel) => {
    const updatedFields = [...fields];
    updatedFields[index].label = newLabel;
    setFields(updatedFields);
  };

  const handleAddOption = (index) => {
    const updatedFields = [...fields];
    if (!updatedFields[index].options) {
      updatedFields[index].options = [];
    }
    updatedFields[index].options.push("New Option");
    setFields(updatedFields);
  };

  const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
    const updatedFields = [...fields];
    if (updatedFields[index].options) {
      updatedFields[index].options[optionIndex] = newOptionName;
    } else {
      updatedFields[index].options = [newOptionName];
    }
    setFields(updatedFields);
  };

  const handleSaveLayout = async () => {
    try {
      if (stepname === "2") {
        const secondsetepfiled = [
          stepname,
          fields.map((field) => ({ ...field })),
        ];
        let firstepdata = localStorage.getItem("layouts");
        firstepdata = firstepdata ? JSON.parse(firstepdata) : { steps: [] };
        firstepdata.steps.push(secondsetepfiled);
        localStorage.setItem("layouts", JSON.stringify(firstepdata));

        // Send data to the backend
        const response = await api.post("/bankformlayout", firstepdata);
        console.log("API Response:", response.data);

        setOpenPopup(true);
        console.log("vaiavib");
      } else {
        const layoutToSave = {
          bankId: selectedBankId,
          steps: [[stepname, fields.map((field) => ({ ...field }))]],
        };
        setFormData(layoutToSave);
        localStorage.setItem("layouts", JSON.stringify(layoutToSave));
        onSaveForm(formName, fields);
      }
    } catch (error) {
      console.error("Error saving layout:", error);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    localStorage.removeItem("layouts");
  };

  const deleteAllLayout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleInputChange = (field, value) => {
    setFormName((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  useEffect(() => {
    const selectedLayout = layouts.find(
      (layout) =>
        layout.bankId._id === selectedBankId &&
        layout.steps.some((step) => step.stepNumber === stepname)
    );
    setSelectedStepLayout(
      selectedLayout?.steps.find((step) => step.stepNumber === stepname)
    );
  }, [selectedBankId, stepname, layouts]);

  useEffect(() => {
    setFields(selectedStepLayout?.fileds || []);
  }, [selectedStepLayout]);

  const renderFields = () => {
    return fields.map((field, index) => (
      <div key={index} className="form-field">
        <label
          onDoubleClick={() => {
            const newLabel = prompt("Enter new label:", field.label);
            if (newLabel) {
              handleFieldLabelChange(index, newLabel);
            }
          }}
        >
          {field.label}
        </label>
        {renderInput(field, index, field.label)}
      </div>
    ));
  };

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
      case "input-file":
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
            <label>Input Dropdown</label>
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
            <button
              className="btn btn-sm btn-success ms-2"
              onClick={() => handleAddOption(index)}
            >
              Add More Option
            </button>
            {field.options?.map((option, optionIndex) => (
              <button
                key={optionIndex}
                className="btn btn-sm btn-secondary ms-2"
                onClick={() => {
                  const newOptionName = prompt(
                    "Enter new option name:",
                    option
                  );
                  if (newOptionName) {
                    handleUpdateOptionName(index, optionIndex, newOptionName);
                  }
                }}
              >
                Edit Option {optionIndex + 1}
              </button>
            ))}
          </div>
        );
      // Add cases for other field types here...
      default:
        return null;
    }
  };

  const handleSaveData = async () => {
    try {
      const dataToSave = {
        formName: formName,
        formData: { ...formData },
      };

      await api.post("/formdata", dataToSave);

      console.log("Form data saved successfully!");
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const handleResetForm = () => {
    setFields([]);
    setFormData({});
    setFormName("");
  };

  return (
    <div className="form-builder container">
      <div
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        className="form-container border-warning w-75 p-4"
      >
        {renderFields()}
        <Dialog open={openPopup} onClose={handleClosePopup}>
          <DialogTitle>Layout Saved</DialogTitle>
          <DialogContent>
            Your layout has been successfully saved.
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopup} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <div className="form-buttons">
          <button onClick={handleResetForm} className="btn btn-danger ms-2">
            Reset Form
          </button>
        </div>
        <div className="m-3 d-flex justify-content-between ">
          <input
            type="text"
            placeholder="Enter layout name"
            value={layoutName}
            onChange={(e) => setLayoutName(e.target.value)}
          />
          <button onClick={handleSaveLayout} className="btn btn-primary">
            Save
          </button>
        </div>
        <button onClick={handleSaveData} className="btn btn-info ms-2">
          Log Data
        </button>
        <select onChange={handelBankSelect}>
          {Banks &&
            Banks.map((bank, index) => (
              <option key={index} value={bank._id}>
                {bank.bankname}
              </option>
            ))}
        </select>
        <div>
          <h4>Saved Layouts:</h4>
          <ul>
            {layouts.map((layout, index) => (
              <li key={index}>
                <button
                  className="btn btn-warning m-1"
                  onClick={() =>
                    handelBankSelect({ target: { value: layout.bankId._id } })
                  }
                >
                  {layout.bankId.bankname}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {layouts.length > 0 && (
          <div className="d-flex ">
            <button onClick={deleteAllLayout} className="btn btn-danger">
              Delete All Layout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
