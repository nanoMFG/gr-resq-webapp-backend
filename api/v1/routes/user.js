"use strict";

const express = require("express");
const router = express.Router();
const checkAuthentication = require("../middleware/authentication");
const {
  handleGetUserProfile,
  handleGetUserGroupsByUserID,
  handleGetUserExperimentsByUserID,
  handleUpdateUserByUserID,
  handleDeleteUserByUserID,
} = require("../handlers/user");

router.get("/get-user-profile", checkAuthentication, handleGetUserProfile);

router.put("/update-user/:userID", checkAuthentication, handleUpdateUserByUserID);

router.delete("/delete-user/:userID", checkAuthentication, handleDeleteUserByUserID);

module.exports = router;
