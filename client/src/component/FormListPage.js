import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const FormListPage = () => {
  const [forms, setForms] = useState([]);

//   useEffect(() => {
//     const fetchForms = async () => {
//       try {
//         const response = await api.get("/formdata");
//         if (response.status === 200) {
//           const data = response.data.data;
//           setForms(data);
//         } else {
//           console.error("Failed to fetch forms");
//         }
//       } catch (error) {
//         console.error("Error fetching forms:", error);
//       }
//     };

//     fetchForms();
//   }, []);
 useEffect(() => {
   const fetchForms = async () => {
     try {
       const response = await api.get("/formlayout");
       if (response.status === 200) {
         const data = response.data.data;
         // Filter layouts for the current step
         setForms(data);
       } else {
         console.error("Failed to fetch layouts");
       }
     } catch (error) {
       console.error("Error fetching layouts:", error);
     }
   };

   fetchForms();
 }, []);

  return (
    <div className="container">
      <h2>Saved Forms:</h2>
      <ul>
        {forms.map((form) => (
          <li key={form._id}>
            <Link to={`/form-builder/${form._id}`}>{form.formName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormListPage;
