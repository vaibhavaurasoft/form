const express = require("express");
const router = express.Router();
const data = require('../controller/step')

router.route("/step").post(data.addStep).get(data.Allsetps)
router.route("/deleteallstep").delete(data.deleteAllStep);
module.exports = router;
