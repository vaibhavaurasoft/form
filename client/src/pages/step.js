import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import api from "../api/api";
import FormBuilderView from "./form";

function StepData() {
  const [allSteps, setAllSteps] = useState([]); // Store fetched steps from API
  const [activeStep, setActiveStep] = useState(0);

  const handleBackStep = () => {
    if (activeStep > 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };
  localStorage.setItem("activeStep", activeStep + 1);
  const handleNextStep = () => {
    if (activeStep < allSteps.length - 1) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };

  useEffect(() => {
    // Fetch all steps from the API
    fetchSteps();
  }, []);

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
        {/* {activeStep >= 0 && activeStep < allSteps.length && (
          <FieldSidebar step={activeStep + 1} />
        )} */}
        {/* <FormBuilder
          onNextStep={handleNextStep}
        /> */}
        <FormBuilderView />
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

export default StepData;
// this is my step form, and in this code i want when i click on save and next step change to next step