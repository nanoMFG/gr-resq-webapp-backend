"use strict";

const shortUUID = require("short-uuid");
const JWT = require("jsonwebtoken");
const { JWTSecret, JWTExpiryDuration } = require("../config/index");

exports.verifyJWT = async (token) => await JWT.verify(token, JWTSecret);

exports.generateNewJWT = async (userID, userRoles) => {
  return await JWT.sign({ userID, userRoles }, JWTSecret, {
    expiresIn: JWTExpiryDuration,
  });
};

exports.createKey = (identifier, entityType) => {
  let key;

  switch (entityType) {
    case "user":
      key = `user#${identifier}`;
      break;
    case "experiment":
      key = `experiment#${identifier}`;
      break;
    case "group":
      key = `group#${identifier}`;
      break;
    case "share":
      key = `share#${identifier}`;
      break;
    case "institution":
      key = `institution#${identifier}`;
      break;
  }

  return key;
};

exports.getIdentifier = (key) => key.split("#")[1];

exports.generateNewUUID = () => shortUUID.generate();

exports.getISODateTime = new Date(Date.now()).toISOString();
