"use strict";

const { dynamoDB, documentClient } = require("../../../config/db");
const { tableName } = require("../../../config/index");
const { errorMessages } = require("../../../utils/constants");
const { HTTPError } = require("../../../utils/errors");
const { createKey, generateJWT } = require("../../../utils/index");

module.exports = {
  handleLogIn: async (req, res, next) => {
    const userData = req.body;

    // TODO: add AJV validation schema

    const userPartitionKey = createKey(userData.username, "user");

    const { Item } = await documentClient.get({
      TableName: tableName,
      Key: { partitionKey: userPartitionKey, sortKey: userPartitionKey },
    });

    if (Item.length === 0) {
      const error = errorMessages.USER_DOES_NOT_EXIST;
      throw new HTTPError(error.status, error.message);
    }



    return res.send({ message: "hello login" });
  },

  handleLogOut: async (req, res, next) => {
    return res.send({ message: "hello logout" });
  },
};
