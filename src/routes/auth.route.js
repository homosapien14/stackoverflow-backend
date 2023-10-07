const express = require("express");
const router = express.Router();
const { auth } = require("../controllers/users.controller");

router.get("/", auth);

module.exports = router;
