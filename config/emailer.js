"use strict";

const AWS = require("aws-sdk");
const {
  region,
  accessKeyID,
  secretAccessKey,
} = require("../config/index");

const ses = new AWS.SES({
  accessKeyId: accessKeyID,
  secretAccessKey,
  region,
});

module.exports = { ses };