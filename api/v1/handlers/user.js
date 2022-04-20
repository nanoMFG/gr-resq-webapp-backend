"use strict";

const { createKey } = require("../../../utils/index");
const { tableName } = require("../../../config/index");
const { errorMessages, successMessages } = require("../../../utils/constants");
const { HTTPError } = require("../../../utils/errors");

exports.handleGetUserProfile = async (req, res, next) => {
  try {
    const email = req.query.email;
    const userID = req.query.userID;

    if (!email && !userID) {
      const error = errorMessages.BAD_REQUEST();
      throw new HTTPError(error.status, error.message);
    }

    let queryParams = {
      TableName: tableName,
      FilterExpression: "entityType = :entityType",
    };

    if (email) {
      // TODO: validate email with AJV
      queryParams.IndexName = "EmailIndex";
      queryParams.KeyConditionExpression = "email = :email";
      queryParams.ExpressionAttributeValues = {
        ":email": email,
        ":entityType": "user",
      };
    } else if (userID) {
      const userPartitionKey = createKey(userID, "user");

      queryParams.KeyConditionExpression =
        "partitionKey = :userPartitionKey AND sortKey = :userPartitionKey";
      queryParams.ExpressionAttributeValues = {
        ":userPartitionKey": userPartitionKey,
        ":entityType": "user",
      };
    }

    const { Item } = await documentClient.query(queryParams).promise();

    if (Item.length === 0) {
      const error = errorMessages.USER_DOES_NOT_EXIST();
      throw new HTTPError(error.status, error.message);
    }

    const response = successMessages.USER_RETRIEVED_SUCCESSFULLY(Item);
    return res.status(response.status).send(response);
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};



exports.handleUpdateUser = async (req, res, next) => {
  try {
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};

exports.handleDeleteUser = async (req, res, next) => {
  try {
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};
