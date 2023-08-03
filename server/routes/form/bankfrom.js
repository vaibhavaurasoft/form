const express = require("express");
const router = express.Router();
const data = require("../../controller/Form/bankForm");

// Save form layout
router.route("/bankformlayout").post(data.addFormLayout).get(data.getAllFormLayouts).delete(data.deleteAllFormLayouts);
router.route("/bankformlayout/:id").get(data.getFormLayoutById).delete(data.deleteFormLayoutById).put(data.updateFormLayoutById)


module.exports = router;