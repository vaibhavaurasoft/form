import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const FormListPage = () => {
  const [savedForms, setSavedForms] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState("");

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


  const handelDeleteForm = (formId) => {
    setFormToDelete(formId); // Store the form ID
    openDialog(); // Open the dialog
  };
  const handleConfirmDelete = async () => {
    closeDialog(); // Close the dialog
    try {
      const response = await api.delete(`/bankformlayout/${formToDelete}`);
      if (response.status === 200) {
        // Remove the deleted form from the savedForms array
        setSavedForms(savedForms.filter((form) => form._id !== formToDelete));
        window.alert("Form deleted successfully");
      }
    } catch (error) {
      window.alert("Form deletion failed", error);
    }
  };

    const openDialog = () => {
      setDialogOpen(true);
    };

    const closeDialog = () => {
      setDialogOpen(false);
    };

  return (
    <div className="container mt-5">
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this form?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <h1 className="text-center mb-4">Form List</h1>
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
                <td>
                  {layout.bankId ? (
                    <Link to={`/all-forms/${layout._id}`}>
                      {layout.bankId.bankname}
                    </Link>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handelDeleteForm(layout._id)}
                  >
                    Delete
                  </Button>
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
