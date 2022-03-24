"use strict";

const express = require('express');
const router = express.Router();
const authAPIRouter = require("./auth");
const experimentsAPIRouter = require("./experiments");
const userAPIRouter = require("./user");

router.use("/auth", authAPIRouter);

router.use("/user", userAPIRouter);

router.use("/experiments", experimentsAPIRouter);

module.exports = router;