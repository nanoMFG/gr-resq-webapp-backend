"use strict";

const express = require("express");
const router = express.Router();
const checkAuthentication = require("../middleware/authentication");
const {
  handleCreateGroup,
  handleGetGroupByGroupID,
  handleUpdateGroupByGroupID,
  handleDeleteGroupByGroupID,
} = require("../handlers/group");

router.post("/create-group", checkAuthentication, handleCreateGroup);

router.get("/get-group/:groupID", checkAuthentication, handleGetGroupByGroupID);

router.get("/get-user-groups/:userID", checkAuthentication, handleGetUserGroupsByUserID);

router.put("/update-group/:groupID", checkAuthentication, handleUpdateGroupByGroupID);

router.delete("/delete-group/:groupID", checkAuthentication, handleDeleteGroupByGroupID);

module.exports = router;
