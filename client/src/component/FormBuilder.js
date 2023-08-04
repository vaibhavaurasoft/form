 import React, { useState, useEffect } from "react";
 import {
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
 } from "@mui/material";
 import "./FormBuilder.css";
 import api from "../api/api";

 const FormBuilder = ({ onNextStep }) => {
   // State variables
   var stepname = localStorage.getItem("activeStep");
   const [openPopup, setOpenPopup] = useState(false);
   const [fields, setFields] = useState([]);
   const [formName, setFormName] = useState("");
   const [formData, setFormData] = useState();
   const [layouts, setLayouts] = useState([]);
   const [Banks, setBanks] = useState([]);
   const [selectedBankId, setSelectedBankId] = useState("");
  //  const [ stepname , setStepname ] = useState("1")

  //  useEffect(() => {
  //    setStepname(localStorage.getItem("activeStep"));
  //  }, [stepname]);

   // Handle drop event
   const handleDrop = (event) => {
     event.preventDefault();
     const field = event.dataTransfer.getData("field");
     setFields((prevFields) => [...prevFields, { type: field, label: field }]);
   };

   // Fetch banks on component mount
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

   // Handle field label change
   const handleFieldLabelChange = (index, newLabel) => {
     const updatedFields = [...fields];
     updatedFields[index].label = newLabel;
     setFields(updatedFields);
   };

   // Handle adding options to a field
   const handleAddOption = (index) => {
     const updatedFields = [...fields];
     if (!updatedFields[index].options) {
       updatedFields[index].options = [];
     }
     updatedFields[index].options.push("New Option");
     setFields(updatedFields);
   };

   // Handle updating an option name
   const handleUpdateOptionName = (index, optionIndex, newOptionName) => {
     const updatedFields = [...fields];
     if (updatedFields[index].options) {
       updatedFields[index].options[optionIndex] = newOptionName;
     } else {
       updatedFields[index].options = [newOptionName];
     }
     setFields(updatedFields);
   };

   //
  const handleSaveLayout = async () => {
    try {
      if (stepname === "2") {
        const secondstepfield = [
          stepname,
          fields.map((field) => ({ ...field })),
        ];
        let firstepdata = localStorage.getItem("layouts");
        firstepdata = firstepdata ? JSON.parse(firstepdata) : { steps: [] };
        firstepdata.steps.push(secondstepfield);
        localStorage.setItem("layouts", JSON.stringify(firstepdata));

        // Send data to the backend
        const response = await api.post("/bankformlayout", firstepdata);
        console.log("API Response:", response.data);
        setOpenPopup(true); // Open the popup after successful API call
      } else {
        const layoutToSave = {
          bankId: selectedBankId,
          steps: [[stepname, fields.map((field) => ({ ...field }))]],
        };
        setFormData(layoutToSave);
        localStorage.setItem("layouts", JSON.stringify(layoutToSave));

        onNextStep();
      }
    } catch (error) {
      console.error("Error saving layout:", error);
    }
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setOpenPopup(false);
    localStorage.removeItem("layouts");
    window.location.reload()
  };

  // Handle resetting the form
  const handleResetForm = () => {
    setFields([]);
    setFormData({});
    setFormName("");
    setOpenPopup(false); // Close the popup when resetting the form
  };
  
useEffect(()=>{
  handleResetForm()
},[stepname])

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
       const response = await api.get(`/bankformlayout/${layoutId}`);
       // const response = await api.get(
       //   `/bankformlayout/64ca4c5b1386285eea0034cd`
       // );

       const loadedLayout = response.data.data; // Assuming there's only one layout fetched
       console.log(loadedLayout.bankId);
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

   // Handle bank select event
   const handelBankSelect = async (event) => {
     const selectedBankId = event.target.value;
     setSelectedBankId(selectedBankId);
     await handleLoadLayout(selectedBankId); // Fetch the selected step layout based on the bank ID
   };

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

   // Handle saving form data
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

   // Handle deleting all layouts
   const deleteAllLayout = () => {
     localStorage.clear();
     window.location.reload();
   };
   const formContainerClass = openPopup
     ? "form-container animated shake"
     : "form-container";
   return (
     <div className="form-builder  container">
       {stepname && stepname === "1" ? (
         <select onChange={handelBankSelect} className="form-select mt-3 w-50">
           <option>Select Your Bank</option>
           {Banks &&
             Banks.map((bank, index) => (
               <option key={index} value={bank._id}>
                 {bank.bankname}
               </option>
             ))}
         </select>
       ) : (
         ""
       )}

       <div
         onDrop={handleDrop}
         onDragOver={(event) => event.preventDefault()}
         className={`${formContainerClass} border-warning w-75 p-4 bg-light mt-2`}
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
         <div className="mt-3 d-flex justify-content-center align-items-center">
           {stepname && stepname === "2" ? (
             <button onClick={handleSaveLayout} className="btn btn-primary">
               Save
             </button>
           ) : (
             <button onClick={handleSaveLayout} className="btn btn-primary">
               Save& Next
             </button>
           )}
         </div>
         <div className="form-buttons mt-3">
           <button onClick={handleResetForm} className="btn btn-danger ms-2">
             Reset Form
           </button>
         </div>
         {/* <button onClick={handleSaveData} className="btn btn-info mt-3">
          Log Data
        </button> */}

         {/* <div className="mt-3">
          <h4>Saved Layouts:</h4>
          <ul className="list-unstyled">
            {layouts.map((layout, index) => (
              <li key={index}>
                <button
                  className="btn btn-warning m-1"
                  onClick={() => handleLoadLayout(layout._id)}
                >
                  {layout.bankId.bankname}
                </button>
              </li>
            ))}
          </ul>
        </div> */}
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

