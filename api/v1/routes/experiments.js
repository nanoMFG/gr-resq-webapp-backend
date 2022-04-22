"use strict";

const express = require("express");
const router = express.Router();
const {
  handleCreateExperiment,
  handleGetExperimentByExperimentID,
  handleUpdateExperimentByExperimentID,
  handleDeleteExperimentByExperimentID,
  handleQueryExperiments,
} = require("../handlers/experiments");
const checkAuthentication = require("../middleware/authentication");

router.post("/create-experiment", checkAuthentication, handleCreateExperiment);

router.get(
  "/get-experiment/:experimentID",
  checkAuthentication,
  handleGetExperimentByExperimentID
);

router.get("/get-user-experiments/:userID", checkAuthentication, handleGetUserExperimentsByUserID);

router.post("/query-experiments", checkAuthentication, handleQueryExperiments);

router.put(
  "/update-experiment/:experimentID",
  checkAuthentication,
  handleUpdateExperimentByExperimentID
);

router.delete(
  "/delete-experiment/:experimentID",
  checkAuthentication,
  handleDeleteExperimentByExperimentID
);

module.exports = router;
