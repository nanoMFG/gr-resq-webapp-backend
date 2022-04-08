"use strict";

const { documentClient } = require("../../../config/db");
const { tableName } = require("../../../config/index");
const { errorMessages, successMessages } = require("../../../utils/constants");
const { HTTPError } = require("../../../utils/errors");
const { createKey, generateNewJWT } = require("../../../utils/index");

module.exports = {
  handleLogIn: async (req, res, next) => {
    const userData = req.body;

    // TODO: add AJV validation schema
    let queryParams = {
      TableName: tableName,
    };

    if (userData.hasOwnProperty("username")) {
      queryParams.IndexName = "UsernameIndex";
      queryParams.KeyConditionExpression = "username = :username";
      queryParams.FilterExpression = "entityType = :entityType";
      queryParams.ExpressionAttributeValues = {
        ":username": `${userData.username}`,
        ":entityType": "user",
      };
    } else if (userData.hasOwnProperty("email")) {
      queryParams.IndexName = "EmailIndex";
      queryParams.KeyConditionExpression = "email = :email";
      queryParams.ExpressionAttributeValues = {
        ":email": `${userData.email}`,
        ":entityType": "user",
      };
    }

    const { Item } = await documentClient.query(queryParams).promise();

    if (Item.length === 0) {
      const error = errorMessages.USER_DOES_NOT_EXIST;
      throw new HTTPError(error.status, error.message);
    }

    const userPartitionKey = createKey(Item.userID, "user");
    queryParams = {
      TableName: tableName,
      KeyConditionExpression:
        "partitionKey = :userPartitionKey AND begins_with(sortKey, :groupSortKey)",
      FilterExpression: "entityType = :entityType",
      ExpressionAttributeValues: {
        ":userPartitionKey": userPartitionKey,
        ":groupSortKey": "group",
        ":entityType": "group",
      },
    };
    const { Items } = await documentClient.query(queryParams).promise();
    let userRoles = {};

    if (Items.length > 0) {
      Items.forEach((groupData) => {
        groupID = groupData.groupID;
        groupRole = groupData.groupRole;
        userRoles.groupID = groupRole;
      });
    }

    const newJWT = await generateNewJWT(Item.userID, userRoles);
    const response = successMessages.LOGGED_IN_SUCCESSFULLY({
      tokenType: "Bearer",
      accessToken: newJWT,
    });
    return res.status(response.status).send(response);
  },

  handleLogOut: async (req, res, next) => {
    return res.send({ message: "hello logout" });
  },
};
