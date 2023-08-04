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


   var stepname = localStorage.getItem("activeStep");
   const [openPopup, setOpenPopup] = useState(false);
   const [fields, setFields] = useState([]);
   const [formName, setFormName] = useState("");
   const [formData, setFormData] = useState();
   const [layouts, setLayouts] = useState([]);
   const [Banks, setBanks] = useState([]);
   const [selectedBankId, setSelectedBankId] = useState("");
 

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
        const secondstepfield = [
          stepname,
          fields.map((field) => ({ ...field })),
        ];
        let firstepdata = localStorage.getItem("layouts");
        firstepdata = firstepdata ? JSON.parse(firstepdata) : { steps: [] };
        firstepdata.steps.push(secondstepfield);
        localStorage.setItem("layouts", JSON.stringify(firstepdata));

        const response = await api.post("/bankformlayout", firstepdata);
        console.log("API Response:", response.data);
        setOpenPopup(true);
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

  const handleClosePopup = () => {
    setOpenPopup(false);
    localStorage.removeItem("layouts");
    window.location.reload()
  };

  const handleResetForm = () => {
    setFields([]);
    setFormData({});
    setFormName("");
    setOpenPopup(false); 
  };
  
useEffect(()=>{
  handleResetForm()
},[stepname])

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

   const handleLoadLayout = async (layoutId) => {
     try {
       const response = await api.get(`/bankformlayout/${layoutId}`);
      
       const loadedLayout = response.data.data; 
       console.log(loadedLayout.bankId);
       setSelectedBankId(loadedLayout.bankId?._id || "");
       const loadedFields = loadedLayout.steps.find(
         (step) => step.stepNumber === stepname
       ).fileds;
       setFields(loadedFields);
     } catch (error) {
       console.error("Error loading layout:", error);
     }
   };

   const handelBankSelect = async (event) => {
     const selectedBankId = event.target.value;
     setSelectedBankId(selectedBankId);
     await handleLoadLayout(selectedBankId); 
   };

   useEffect(() => {
     const fetchLayout = async () => {
       if (selectedBankId && stepname) {
         await handleLoadLayout(selectedBankId);
       }
     };

     fetchLayout();
   }, [selectedBankId, stepname]);

   const handleInputChange = (field, value) => {
     setFormName((prevFormData) => ({
       ...prevFormData,
       [field]: value,
     }));
   };

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
        
       </div>
     </div>
   );
 };

 export default FormBuilder;

