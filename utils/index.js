"use strict";

const shortUUID = require("short-uuid");
const JWT = require("jsonwebtoken");
const { JWTSecret, JWTExpiryDuration } = require("../config/index");

exports.verifyJWT = async (token) => await JWT.verify(token, JWTSecret);

exports.generateJWT = async (userID, groupID, role) => {
  return await jwt.sign(
    { user_id: userID, group_id: groupID, role },
    JWTSecret,
    { expiresIn: JWTExpiryDuration }
  );
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

exports.createUUID = () => shortUUID.generate();

exports.getISODateTime = new Date(Date.now()).toISOString();
