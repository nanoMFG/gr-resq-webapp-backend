"use strict";

const dynamoose = require("dynamoose");
const {
  region,
  endpoint,
  accessKeyID,
  secretAccessKey,
} = require("../config/index");

dynamoose.aws.sdk.config.update({
  accessKeyId: accessKeyID,
  secretAccessKey,
  region,
});

dynamoose.aws.ddb.local(endpoint);

module.exports = dynamoose;
