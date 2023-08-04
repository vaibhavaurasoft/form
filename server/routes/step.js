const express = require("express");
const router = express.Router();
const data = require('../controller/step')

router.route("/step").post(data.addStep).get(data.Allsetps)
router.route("/deleteallstep").delete(data.deleteAllStep);
router.route("/deletstep/:id").delete(data.deleteStepById);
module.exports = router;
