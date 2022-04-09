"use strict";

const express = require("express");
const router = express.Router();
const { handleUserSignIn, handleUserSignUp } = require("../handlers/auth");

router.post("/sign-in", handleUserSignIn);

router.post("/sign-up", handleUserSignUp);

module.exports = router;
