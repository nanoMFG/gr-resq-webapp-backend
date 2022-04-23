"use strict";

const { createKey } = require("../../../utils/index");
const { tableName } = require("../../../config/index");
const { errorMessages, successMessages } = require("../../../utils/constants");
const { HTTPError } = require("../../../utils/errors");
const { documentClient } = require("../../../config/db");
const { roles } = require("../../../config/index");

exports.handleAssignUserRole = async (req, res, next) => {};

exports.handleApproveUserRole = async (req, res, next) => {};

exports.handleRemoveUserRole = async (req, res, next) => {};

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

exports.handleUpdateUserByUserID = async (req, res, next) => {
  try {
    const userID = req.params.userID;

    // TODO: validate userID with AJS
    if (!userID) {
      const error = errorMessages.BAD_REQUEST();
      throw new HTTPError(error.status, error.message);
    }

    const reqUserPartitionKey = createKey(req.params.userID, "user");

    if (reqUserPartitionKey !== res.locals.userPartitionKey) {
      const error = errorMessages.NOT_AUTHORIZED();
      throw new HTTPError(error.status, error.message);
    }

    const newUserData = {};

    req.body.firstName && (newUserData.firstName = req.body.firstName);
    req.body.lastName && (newUserData.lastName = req.body.lastName);
    req.body.institutionName &&
      (newUserData.institutionName = req.body.institutionName);
    req.body.institutionDomain &&
      (newUserData.institutionDomain = req.body.institutionDomain);

    let updateString = "set";
    let ExpressionAttributeValues = {};

    Object.keys(newUserData).forEach((key) => {
      updateString += ` ${key} = :${key}`;
      ExpressionAttributeValues[`:${key}`] = newUserData[key];
    });

    const queryParams = {
      TableName: tableName,
      Key: {
        partitionKey: res.locals.userPartitionKey,
        sortKey: res.locals.userPartitionKey,
      },
      UpdateExpression: updateString,
      ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };
    await documentClient.update(queryParams).promise();

    const response = successMessages.USER_UPDATED_SUCCESSFULLY();
    return res.status(response.status).send(response);
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};

exports.handleDeleteUserByUserID = async (req, res, next) => {
  try {
    const userID = req.params.userID;

    // TODO: validate userID with AJS
    if (!userID) {
      const error = errorMessages.BAD_REQUEST();
      throw new HTTPError(error.status, error.message);
    }

    const reqUserPartitionKey = createKey(req.params.userID, "user");

    if (reqUserPartitionKey !== res.locals.userPartitionKey) {
      const error = errorMessages.NOT_AUTHORIZED();
      throw new HTTPError(error.status, error.message);
    }

    const queryParams = {
      TableName: tableName,
      Key: {
        partitionKey: res.locals.userPartitionKey,
        sortKey: res.locals.userPartitionKey,
      },
    };

    await documentClient.delete(queryParams).promise();

    const response = successMessages.USER_DELETED_SUCCESSFULLY();
    return res.status(response.status).send(response);
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};
