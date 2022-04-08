"use strict";

const express = require("express");
const router = express.Router();
const authHandler = require("../handlers/auth");

router.post("/login", authHandler.handleLogIn);

router.post("/logout", authHandler.handleLogOut);

module.exports = router;
