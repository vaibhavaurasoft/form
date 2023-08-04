const express = require("express");
const router = express.Router();
const data = require("../../controller/bank/banks")

router.route("/bank").post(data.addBank).get(data.AllBanks)
router.route("/deleteallsbanks").delete(data.deleteAllBanks);
router.route("/bank/:id").get(data.GetBankById).delete(data.DeleteBankById)
module.exports = router;
