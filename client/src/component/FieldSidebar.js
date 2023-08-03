// // FieldSidebar.js
// import React, { useState, useEffect } from "react";
// import FormBuilder from "./FormBuilder";

// const FieldSidebar = ({ step }) => {
//   const [forms, setForms] = useState([]);
//   const [selectedForm, setSelectedForm] = useState(null);
//   const [formName, setFormName] = useState("");

//   // Function to handle the form name prompt
//   const handleFormNamePrompt = () => {
//     const storedFormName = localStorage.getItem("formName");
//     if (storedFormName) {
//       setFormName(storedFormName);
//     } else {
//       const enteredFormName = prompt("Please enter a form name:");
//       if (enteredFormName) {
//         setFormName(enteredFormName);
//         localStorage.setItem("formName", enteredFormName);
//       }
//     }
//   };
//  useEffect(() => {
//    handleFormNamePrompt();
//  }, []);
//   const handleDragStart = (event, field) => {
//     event.dataTransfer.setData("field", field);
//   };

//   const handleSaveForm = (formName, formLayout) => {
//     const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
//     const newLayouts = [...storedLayouts];

//     // Save the layout for the current step in local storage
//     newLayouts.push({
//       step: step,
//       name: formName,
//       fields: formLayout,
//     });
//     localStorage.setItem("layouts", JSON.stringify(newLayouts));

//     // Update the forms state to show the saved layout in the sidebar
//     setForms((prevForms) => [
//       ...prevForms,
//       { name: formName, layout: formLayout },
//     ]);
//   };

//   const handleFormClick = (index) => {
//     setSelectedForm(forms[index].layout);
//   };
//   const handleFormSelect = (index) => {
//     const selectedFormLayout = forms[index].layout;
//     // Do something with the selectedFormLayout, if needed.
//   };

//   const filteredForms = forms.filter((form) => form.step === step);

//   return (
//     <div className="d-flex p-3">
//       <div
//         className="border w-25 d-flex flex-column "
//         style={{ background: "" }}
//       >
//         {/* Your draggable fields here */}
//         <div
//           draggable
//           onDragStart={(event) => handleDragStart(event, "input-text")}
//           style={{
//             backgroundColor: "lightblue",
//             padding: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           Input Text
//         </div>
//         <div
//           draggable
//           onDragStart={(event) => handleDragStart(event, "input-dropdown")}
//           style={{
//             backgroundColor: "lightblue",
//             padding: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           dropdown
//         </div>
//       </div>
//       <FormBuilder onSaveForm={handleSaveForm} formLayout={null} />
//       <div className="w-25 ms-3">
//         <h4>Saved Forms for Step {step}:</h4>
//         <ul>
//           {forms.map((form, index) => (
//             <li key={index} onClick={() => handleFormSelect(index)}>
//               {form.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default FieldSidebar;

import React, { useState } from "react";
import FormBuilder from "./FormBuilder";

const FieldSidebar = ({ step }) => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const handleDragStart = (event, field) => {
    event.dataTransfer.setData("field", field);
  };

  const handleSaveForm = (formName, formLayout) => {
    const storedLayouts = JSON.parse(localStorage.getItem("layouts") || "[]");
    const newLayouts = [...storedLayouts];

    // Save the layout for the current step in local storage
    newLayouts.push({
      step: step,
      name: formName,
      fields: formLayout,
    });
    localStorage.setItem("layouts", JSON.stringify(newLayouts));

    // Update the forms state to show the saved layout in the sidebar
    setForms((prevForms) => [
      ...prevForms,
      { name: formName, layout: formLayout },
    ]);
  };

  const handleFormClick = (index) => {
    setSelectedForm(forms[index].layout);
  };
  const handleFormSelect = (index) => {
    const selectedFormLayout = forms[index].layout;
    // Do something with the selectedFormLayout, if needed.
  };

  const filteredForms = forms.filter((form) => form.step === step);

  return (
    <div className="d-flex p-3">
      <div
        className="border w-25 d-flex flex-column "
        style={{ background: "" }}
      >
        {/* Your draggable fields here */}
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-text")}
          style={{
            backgroundColor: "lightblue",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Input Text
        </div>
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-dropdown")}
          style={{
            backgroundColor: "lightpink",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          dropdown
        </div>
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "input-image")}
          style={{
            backgroundColor: "lightblue",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          Input Image
        </div>
      </div>
      <FormBuilder onSaveForm={handleSaveForm} formLayout={null} />
      <div className="w-25 ms-3">
        <h4>Saved Forms for Step {step}:</h4>
        <ul>
          {forms.map((form, index) => (
            <li key={index} onClick={() => handleFormSelect(index)}>
              {form.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FieldSidebar;