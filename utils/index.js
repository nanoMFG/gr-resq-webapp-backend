"use strict";

const shortUUID = require("short-uuid");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  JWTSecret,
  JWTExpiryDuration,
  salt,
  senderEmail,
} = require("../config/index");
const { ses } = require("../config/emailer");

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

exports.hashPassword = async (plainTextPassword) => {
  return await bcrypt.hash(plainTextPassword, salt);
};

exports.comparePasswordHash = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

exports.getISODateTime = () => new Date(Date.now()).toISOString();

exports.sendEmail = async (recipientEmails, groupDetails, Role) => {
  const params = {
    Source: senderEmail,
    Destination: {
      ToAddresses: recipientEmails,
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<button>Click here to approve role</button>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Request for role change`,
      },
    },
  };
  return await ses.sendEmail(params).promise();
};
