"use strict";

const { HTTPError, JWTError } = require("../../../utils/errors");
const { errorMessages } = require("../../../utils/constants");
const { verifyJWT, createKey } = require("../../../utils/index");
const { dynamoDB, documentClient } = require("../../../config/db");
const { tableName } = require("../../../config/index");

const checkAuthentication = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["x-access-token"];
  const token =
    authHeader &&
    authHeader.split(" ")[0] === "Bearer" &&
    authHeader.split(" ")[1];

  if (token === null) {
    const error = errorMessages.AUTHENTICATION_UNSUCESSFUL;
    throw new HTTPError(error.status, error.message);
  }

  let JWTPayload;

  try {
    JWTPayload = await verifyJWT(token);
  } catch (err) {
    const error = errorMessages.INVALID_JWT;
    throw new JWTError(error.message);
  }

  const userPartitionKey = createKey(JWTPayload.sub.userID, "user");
  const { Item } = await documentClient
    .query({
      TableName: tableName,
      Key: { partitionKey: userPartitionKey, sortKey: userPartitionKey },
    })
    .promise();

  if (Item.length === 0) {
    const error = errorMessages.USER_DOES_NOT_EXIST;
    throw new HTTPError(error.status, error.message);
  }

  res.locals.isUserAuthenticated = true;
  res.locals.user = {
    userPartitionKey,
    userRoles: JWTPayload.sub.userRoles,
  };
  next();
};

module.exports = checkAuthentication;
