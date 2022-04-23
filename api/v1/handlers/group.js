"use strict";

const { createKey } = require("../../../utils/index");
const { tableName } = require("../../../config/index");
const { errorMessages, successMessages } = require("../../../utils/constants");
const { HTTPError } = require("../../../utils/errors");
const { documentClient } = require("../../../config/db");

exports.handleUpdateGroupByGroupID = async (req, res, next) => {

};

exports.handleDeleteGroupByGroupID = async (req, res, next) => {
  const groupID = req.params.groupID;

  if (!groupID) {
    const error = errorMessages.BAD_REQUEST();
    throw new HTTPError(error.status, error.message);
  }

  const reqUserPartitionKey = createKey(req.params.userID, "user");

  if (reqUserPartitionKey !== res.locals.userPartitionKey) {
    const error = errorMessages.NOT_AUTHORIZED();
    throw new HTTPError(error.status, error.message);
  }
};