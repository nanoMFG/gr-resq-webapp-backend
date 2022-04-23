"use strict";

const express = require("express");
const router = express.Router();
const checkAuthentication = require("../middleware/authentication");
const {
  handleGetUserProfile,
  handleUpdateUserByUserID,
  handleDeleteUserByUserID,
  handleAssignUserRole,
  handleApproveUserRole,
  handleRemoveUserRole,
} = require("../handlers/user");

router.post("/assign-user-role", checkAuthentication, handleAssignUserRole);

router.post("/approve-user-role", checkAuthentication, handleApproveUserRole);

router.post("/remove-user-role", checkAuthentication, handleRemoveUserRole);

router.get("/get-user-profile", checkAuthentication, handleGetUserProfile);

router.put(
  "/update-user/:userID",
  checkAuthentication,
  handleUpdateUserByUserID
);

router.delete(
  "/delete-user/:userID",
  checkAuthentication,
  handleDeleteUserByUserID
);

module.exports = router;
