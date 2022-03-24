"use strict";

const shortUUID = require("short-uuid");
const JWT = require("jsonwebtoken");
const { JWTSecret, JWTExpiryDuration } = require("../config/index");

exports.generateUUID = shortUUID.generate;

exports.verifyJWT = async (token) => await JWT.verify(token, JWTSecret);

exports.generateJWT = async (userID, groupID, role) => {
  return await jwt.sign(
    { user_id: userID, group_id: groupID, role },
    JWTSecret,
    { expiresIn: JWTExpiryDuration }
  );
};
