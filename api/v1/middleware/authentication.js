"use strict";

const { HTTPError, JWTError } = require("../../../utils/errors");
const { errorMessages } = require("../../../utils/constants");
const { verifyJWT } = require("../../../utils/index");
const { dynamodb } = require("../../../config/db");

const checkAuthentication = async (req, res, next) => {
  const authHeader =
    req.headers["authorization"] ||
    req.headers["x-access-token"] ||
    req.query.token;
  const token =
    authHeader &&
    authHeader.split(" ")[0] === "Bearer" &&
    authHeader.split(" ")[1];

  if (token == null) {
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

  // TODO: add db query for finding user with userID, groupID.
  const user = await dynamodb.findOne({
    userID: JWTPayload.user_id,
    groupID: JWTPayload.group_id,
  });

  if (user === null) {
    const error = errorMessages.USER_DOES_NOT_EXIST;
    throw new HTTPError(error.status, error.message);
  }

  res.locals.isUserAuthenticated = true;
  res.locals.token = JWTPayload;
  next();
};

module.exports = checkAuthentication;
