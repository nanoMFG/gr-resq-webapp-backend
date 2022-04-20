"use strict";

const { HTTPError } = require("../../../utils/errors");
const { errorMessages } = require("../../../utils/constants");
const { verifyJWT, createKey } = require("../../../utils/index");
const { documentClient } = require("../../../config/db");
const { tableName } = require("../../../config/index");

const checkAuthentication = async (req, res, next) => {
  try {
    const authHeader =
      req.headers["authorization"] || req.headers["x-access-token"];
    const token = authHeader && authHeader.split(" ")[0] === "Bearer";

    if (!token) {
      const error = errorMessages.BAD_REQUEST();
      throw new HTTPError(error.status, error.message);
    }

    const JWTPayload = await verifyJWT(token);
    const userPartitionKey = createKey(JWTPayload.userID, "user");
    const queryParams = {
      TableName: tableName,
      Key: { partitionKey: userPartitionKey, sortKey: userPartitionKey },
    };
    const { Item } = await documentClient.get(queryParams).promise();

    if (Item.length === 0) {
      const error = errorMessages.USER_DOES_NOT_EXIST();
      throw new HTTPError(error.status, error.message);
    }

    res.locals.user = {
      userPartitionKey,
      userRoles: JWTPayload.sub.userRoles,
    };

    next();
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    let error;
    if (err.name === "JsonWebTokenError") {
      error = errorMessages.INVALID_JWT();
    } else {
      error = errorMessages.INTERNAL_SERVER_ERROR();
    }
    return next(error);
  }
};

module.exports = checkAuthentication;
