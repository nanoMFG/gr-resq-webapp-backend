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

router.get("/get-user-groups/:userID", checkAuthentication, handleGetUserGroupsByUserID);

router.get("/get-user-experiments/:userID", checkAuthentication, handleGetUserExperimentsByUserID);

router.put("/update-user/:userID", checkAuthentication, handleUpdateUserByUserID);

router.delete("/delete-user/:userID", checkAuthentication, handleDeleteUserByUserID);

module.exports = router;
