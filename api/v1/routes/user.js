"use strict";

const express = require('express');
const router = express.Router();
const userHandler = require("../handlers/user");

router.post("/register", userHandler.handleRegistration);

module.exports = router;