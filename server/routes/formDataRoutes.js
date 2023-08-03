const express = require("express");
const router = express.Router();
const formDataController = require("../controller/formDataController");

// Form Data Routes
router
  .route("/formdata")
  .post(formDataController.saveFormData)
  .get(formDataController.getAllFormData)
  .delete(formDataController.DeletelFormData)

module.exports = router;