"use strict";

const dynamoose = require("../config/db");
const { rolesModel } = require("./roles");

const userSchema = new dynamoose.Schema(
  {
    domain: {
      type: String,
      hashKey: true,
      required: true,
    },
    username: {
      type: String,
      rangeKey: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: String,
    lastName: {
      type: String,
      required: true,
    },
    groups: {
      type: [String],
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: rolesModel,
      required: true,
    },
    institution: String,
  },
  {
    timestamps: true,
  }
);

const userModel = dynamoose.model("User", userSchema);
module.exports = { userModel };
