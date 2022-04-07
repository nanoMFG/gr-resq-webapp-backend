"use strict";

const AWS = require("aws-sdk");
const {
  region,
  endpoint,
  accessKeyID,
  secretAccessKey,
} = require("../config/index");

const dynamoDB = new AWS.DynamoDB({
  accessKeyId: accessKeyID,
  secretAccessKey,
  region,
  endpoint,
});

const documentClient = new AWS.DynamoDB.DocumentClient({
  accessKeyId: accessKeyID,
  secretAccessKey,
  region,
  endpoint,
});

module.exports = { dynamoDB, documentClient };
