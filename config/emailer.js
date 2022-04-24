"use strict";

const AWS = require("aws-sdk");

const ses = new AWS.SES({
  accessKeyId: accessKeyID,
  secretAccessKey,
  region,
});

module.exports = { ses };