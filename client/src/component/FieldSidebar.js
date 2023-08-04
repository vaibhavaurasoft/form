

import React, { useState } from "react";
import FormBuilder from "./FormBuilder";
import { NavLink } from "react-router-dom";
const FieldSidebar = ({ step, onNextStep }) => {

  const handleDragStart = (event, field) => {
    event.dataTransfer.setData("field", field);
  };

  return (
    <div className="d-flex p-3">
      <div
        className="border w-25 d-flex flex-column "
        style={{ background: "" }}
      >
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
      <FormBuilder
        onNextStep={onNextStep}
      />
     
    </div>
  );
};

export default FieldSidebar;