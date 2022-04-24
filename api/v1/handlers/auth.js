"use strict";

const { documentClient } = require("../../../config/db");
const { tableName } = require("../../../config/index");
const { errorMessages, successMessages } = require("../../../utils/constants");
const { HTTPError } = require("../../../utils/errors");
const {
  createKey,
  getIdentifier,
  generateNewJWT,
  comparePasswordHash,
  generateNewUUID,
  hashPassword,
  getISODateTime,
} = require("../../../utils/index");

exports.handleUserSignIn = async (req, res, next) => {
  try {
    const userData = req.body;

    // TODO: validate with AJV schema
    let queryParams = {
      TableName: tableName,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      FilterExpression: "entityType = :entityType",
      ExpressionAttributeValues: {
        ":email": `${userData.email}`,
        ":entityType": "user",
      },
    };

    const { Item } = await documentClient.query(queryParams).promise();

    if (Item === null) {
      const error = errorMessages.USER_DOES_NOT_EXIST();
      throw new HTTPError(error.status, error.message);
    }

    const checkPassword = await comparePasswordHash(
      userData.password,
      Item.passwordHash
    );

    if (checkPassword === false) {
      const error = errorMessages.INVALID_CREDENTIALS();
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
        const groupID = getIdentifier(groupData.partitionKey);
        userRoles[groupID] = groupData.groupRole;
      });
    }

    const newJWT = await generateNewJWT(Item.userID, userRoles);
    const response = successMessages.LOGGED_IN_SUCCESSFULLY({
      tokenType: "Bearer",
      accessToken: newJWT,
    });
    return res.status(response.status).send(response);
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};

exports.handleUserSignUp = async (req, res, next) => {
  try {
    const userData = req.body;

    // TODO: validate using AJV schema
    let queryParams = {
      TableName: tableName,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      FilterExpression: "entityType = :entityType",
      ExpressionAttributeValues: {
        ":email": userData.email,
        ":entityType": "user",
      },
    };

    const { Item } = await documentClient.query(queryParams).promise();

    if (Item !== null) {
      const error = errorMessages.USER_ALREADY_EXISTS();
      throw new HTTPError(error.status, error.message);
    }

    const newUserID = generateNewUUID();
    const newUserPartitionKey = createKey(newUserID, "user");
    const newGroupPartitionKey = createKey(newUserID, "group");
    const ISODateTime = getISODateTime();

    const userUserItem = {
      entityType: "user",
      partitionKey: newUserPartitionKey,
      sortKey: newUserPartitionKey,
      email: userData.email,
      passwordHash: await hashPassword(userData.password),
      createdAt: ISODateTime,
      updatedAt: ISODateTime,
    };

    userData.firstName && (userUserItem.Item.firstName = userData.firstName);
    userData.lastName && (userUserItem.Item.lastName = userData.lastName);
    userData.institutionName &&
      (userUserItem.Item.institutionName = userData.institutionName);
    userData.institutionDomain &&
      (userUserItem.Item.institutionDomain = userData.institutionDomain);

    const userGroupItem = {
      entityType: "group",
      partitionKey: newUserPartitionKey,
      sortKey: newGroupPartitionKey,
      groupName: `${newGroupPartitionKey}_name`,
      groupRole: "basic",
      isRoleApproved: true,
      isGroupPrivate: true,
      createdAt: ISODateTime,
      updatedAt: ISODateTime,
    };

    const groupGroupItem = userGroupItem;
    groupGroupItem.partitionKey = newGroupPartitionKey;
    delete groupGroupItem.groupRole;
    delete groupGroupItem.isRoleApproved;

    queryParams = {
      RequestItems: {
        [tableName]: [
          {
            PutRequest: {
              Item: userUserItem,
            },
          },
          {
            PutRequest: {
              Item: userGroupItem,
            },
          },
          {
            PutRequest: {
              Item: groupGroupItem,
            },
          },
        ],
      },
    };

    await documentClient.batchWrite(queryParams).promise();

    const userRoles = {
      [newUserID]: "basic",
    };

    const newJWT = await generateNewJWT(newUserID, userRoles);
    const response = successMessages.USER_REGISTERED_SUCCESSFULLY({
      tokenType: "Bearer",
      accessToken: newJWT,
    });
    return res.status(response.status).send(response);
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};
