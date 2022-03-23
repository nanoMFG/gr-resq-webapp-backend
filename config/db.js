"use strict";

const AWS = require("aws-sdk");

AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000",
  accessKeyId: "example",
  secretAccessKey: "example",
});

exports.dynamodb = new AWS.DynamoDB();
exports.documentClient = new AWS.DynamoDB.DocumentClient();