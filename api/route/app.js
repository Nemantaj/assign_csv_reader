const express = require("express");
const router = express.Router();
const appController = require("../controller/app.controller");

router.post("/parse", appController.parseCsv);

module.exports = router;
