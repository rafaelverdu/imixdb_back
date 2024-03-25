const express = require("express");
const Login = require("../auth/loginUser");
const router = express.Router();

router.post("/login", Login);

module.exports = router;
