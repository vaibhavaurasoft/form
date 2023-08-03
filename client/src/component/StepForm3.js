import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import FieldSidebar from "./FieldSidebar";
import api from "../api/api";
import FormBuilder from "./FormBuilder";
import { NavLink } from "react-router-dom";

function Stepformlearn() {
  const [allSteps, setAllSteps] = useState([]); // Store fetched steps from API
  const [activeStep, setActiveStep] = useState(0);
  const [stepNames,SetstepNames] =  useState("")

  const handleBackStep = () => {
    if (activeStep > 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (activeStep < allSteps.length - 1) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };
   const HandelNextStep = () => {
     if (activeStep < allSteps.length - 1) {
       setActiveStep((currentStep) => currentStep + 1);
     }
   };
    useEffect(() => {
      localStorage.setItem("Step", JSON.stringify(stepNames));
      localStorage.setItem("activeStep", JSON.stringify(activeStep + 1));
    }, [stepNames, activeStep]);

  useEffect(() => {
    // Fetch all steps from the API
    fetchSteps();
  }, [activeStep]);


  const fetchSteps = async () => {
    try {
      const response = await api.get("/step");
      if (response.status === 200) {
        const data = await response.data;
        setAllSteps(data.data);
      } else {
        console.error("Failed to fetch steps");
      }
    } catch (error) {
      console.error("Error fetching steps:", error);
    }
  };

  return (
    <>
      <div className="container">
        <Stepper activeStep={activeStep}>
          {allSteps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.stepname}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep >= 0 && activeStep < allSteps.length && (
          <FieldSidebar onNextStep={HandelNextStep} step={activeStep + 1} />
        )}
        {/* <FormBuilder
          onNextStep={handleNextStep}
        /> */}
        {activeStep > 0 && (
        <button
          className="m-4 btn btn-outline-primary"
          onClick={handleBackStep}
        >
          Back Step
        </button>
        )}
        {activeStep < allSteps.length - 1 && (
        <button
          className="m-4 btn btn-outline-success"
          onClick={handleNextStep}
        >
          Next Step
        </button>
        )}
      </div>
    </>
  );
}

export default Stepformlearn;

//////////////////////-vaibahv

// import React, { useEffect, useState } from "react";
// import FieldSidebar from "./FieldSidebar"
// import { Stepper, Step, StepLabel, Button, TextField } from "@mui/material";

// const StepForm3 = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [totalSteps, setTotalSteps] = useState(4);
//   const [stepNames, setStepNames] = useState(
//     Array.from({ length: totalSteps }, (_, index) => `Step ${index + 1}`)
//   );

//   const messages = ["Hello", "Hyfry", "Gooo"];

//   const nextStep = () => {
//     if (activeStep < totalSteps - 1) {
//       setActiveStep((currentStep) => currentStep + 1);
//     }
//   };

//   // step
//   const handleNextStep = () => {
//     console.log("vaiahv")
//     setActiveStep((currentStep) => currentStep + 1);
//   };

//   const backStep = () => {
//     if (activeStep > 0) {
//       setActiveStep((currentStep) => currentStep - 1);
//     }
//   };

//   const addStep = () => {
//     setTotalSteps((currentTotalSteps) => currentTotalSteps + 1);
//     setStepNames((currentStepNames) => [
//       ...currentStepNames,
//       `Step ${totalSteps + 1}`,
//     ]);
//   };

//   const handleStepNameChange = (index, newName) => {
//     const updatedStepNames = [...stepNames];
//     updatedStepNames[index] = newName;
//     setStepNames(updatedStepNames);
//   };

//   useEffect(() => {
//     localStorage.setItem("Step", JSON.stringify(stepNames));
//     localStorage.setItem("activeStep", JSON.stringify(activeStep + 1));
//   }, [stepNames, activeStep]);

//   return (
//     <div className="container" style={{ overflowX: "auto" }}>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {stepNames.map((label, index) => (
//           <Step key={index}>
//             <StepLabel>
//               <input
//                 label={`Step ${index + 1}`}
//                 value={label}
//                 onChange={(e) => handleStepNameChange(index, e.target.value)}
//                 variant="outlined"
//                 fullWidth
//                 className="stepformtitle"
//                 style={{ border: "none" }}
//               />
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {activeStep === 0 && (
//           <FieldSidebar step={activeStep + 1} 
//           // onNextStep={handleNextStep} 

//           />
//         )}
//         {activeStep === 1 && (
//           <FieldSidebar step={activeStep + 1} 
//           // onNextStep={handleNextStep} 

//           />
//         )}
//         {activeStep === 2 && (
//           <FieldSidebar step={activeStep + 1}
//           //  onNextStep={handleNextStep} 

//            />
//         )}
//         {activeStep === 3 && <p>{messages[2]}</p>}
//       </div>

//       <div className="d-flex justify-content-center">
//         <Button
//           variant="outlined"
//           style={{ color: "green", margin: "10px" }}
//           onClick={backStep}
//         >
//           Previous Step
//         </Button>
//         <br />
//         <br />
//         <br />
//         <Button
//           variant="outlined"
//           onClick={nextStep}
//           style={{ color: "red", margin: "10px" }}
//         >
//           Next Step
//         </Button>
//         <br />
//         <br />
//         <br />
//         <Button
//           variant="outlined"
//           onClick={addStep}
//           style={{ color: "black", margin: "10px" }}
//         >
//           Add More Step
//         </Button>
//       </div>
//       <br />
//     </div>
//   );
// };

// export default StepForm3;
