// formLayoutRoutes.js
const express = require("express");
const router = express.Router();
const data = require("../controller/formLayoutController");

// Save form layout
router.route("/formlayout").post(data.addFormLayout).get(data.getAllFormLayouts).delete(data.deleteAllFormLayouts);
router.route("/formlayout/:id").get(data.getFormLayoutById).delete(data.deleteFormLayoutById).put(data.updateFormLayoutById)


module.exports = router;

// routes/formLayoutRoutes.js



////////////////////////////

// const express = require("express");
// const router = express.Router();
// const data = require("../controller/formLayoutController");

// // Save form layout
// router.route("/formlayout").post(data.addFormLayout).get(data.getAllFormLayouts);

// // Get form layout by ID, update form layout by ID, delete form layout by ID
// router
//   .route("/formlayout/:id")
//   .get(data.getFormLayoutById)
// //   .put(data.updateFormLayoutById)
// //   .delete(data.deleteFormLayoutById);



// module.exports = router;
