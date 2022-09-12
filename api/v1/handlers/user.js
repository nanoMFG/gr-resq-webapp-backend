"use strict";

const {
  createKey,
  sendEmail,
  getIdentifier,
  getISODateTime,
} = require("../../../utils/index");
const { tableName } = require("../../../config/index");
const { errorMessages, successMessages } = require("../../../utils/constants");
const { HTTPError } = require("../../../utils/errors");
const { documentClient } = require("../../../config/db");
const { roles } = require("../../../config/index");

exports.handleAssignUserRole = async (req, res, next) => {
  try {
    const { role, groupID } = req.body;
    // TODO: validate role and groupID with AJV

    if (res.locals.userRoles.groupID === role) {
      const error = errorMessages.USER_GROUP_ROLE_ALREADY_EXISTS();
      throw new HTTPError(error.status, error.message);
    }

    const groupPartitionKey = createKey(groupID, "group");

    let queryParams = {
      TableName: tableName,
      Key: {
        partitionKey: groupPartitionKey,
        sortKey: groupPartitionKey,
      },
    };

    const { Item } = await documentClient.get(queryParams).promise();

    if (Item === null) {
      const error = errorMessages.GROUP_DOES_NOT_EXIST();
      throw new HTTPError(error.status, error.message);
    }

    queryParams = {
      TableName: tableName,
      IndexName: "InvertedIndex",
      KeyConditionExpression:
        "partitionKey = :groupPartitionKey AND sortKey = :userSortKey",
      FilterExpression: "entityType = :entityType AND groupRole = :role",
      ExpressionAttributeValues: {
        ":groupPartitionKey": groupPartitionKey,
        ":userSortKey": res.locals.userPartitionKey,
        ":entityType": "user",
        ":role": "moderator",
      },
    };

    const { Items } = await documentClient.query(queryParams).promise();

    if (Items.length !== 0) {
      // TODO: send email to moderators
    }

    // TODO: send email to admins

    const response = successMessages.USER_ROLE_ASSIGNMENT_REQUEST_SUBMITTED();
    return res.status(response.status).send(response);
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};

exports.handleApproveUserRole = async (req, res, next) => {
  try {
    const { role, groupID, userID } = req.body;

    const userPartitionKey = createKey(userID, "user");
    const groupSortKey = createKey(groupID, "group");

    // TODO: validate with AJV

    let queryParams = {
      TableName: tableName,
      Key: {
        partitionKey: groupSortKey,
        sortKey: groupSortKey,
      },
    };
    const { Item } = await documentClient.get(queryParams).promise();
    const groupData = Item;

    queryParams = {
      TableName: tableName,
      Key: { partitionKey: userPartitionKey, sortKey: groupSortKey },
    };
    const res = await documentClient.get(queryParams).promise();
    const ISODateTime = getISODateTime();

    if (res === null) {
      queryParams = {
        TableName: tableName,
        Item: {
          entityType: "group",
          partitionKey: userPartitionKey,
          sortKey: groupSortKey,
          groupName: groupData.groupName,
          groupRole: role,
          isGroupPrivate: groupData.isGroupPrivate,
          createdAt: ISODateTime,
          updatedAt: ISODateTime,
        },
      };
      await documentClient.put(queryParams).promise();
    } else {
      queryParams = {
        TableName: tableName,
        Key: {
          partitionKey: userPartitionKey,
          sortKey: groupSortKey,
        },
        UpdateExpression: "set groupRole = :groupRole, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":groupRole": role,
          ":updatedAt": ISODateTime,
        },
      };
      await documentClient.update(queryParams).promise();
    }

    const response = successMessages.USER_ROLE_ASSIGNED_SUCCESSFULLY();
    return res.status(response.status).send(response);
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};

exports.handleRemoveUserRole = async (req, res, next) => {
  try {
    const { role, groupID, userID } = req.body;

    const userPartitionKey = createKey(userID, "user");
    const groupSortKey = createKey(groupID, "group");
    
    
  } catch(err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};

exports.handleGetUserProfile = async (req, res, next) => {
  try {
    const email = req.query.email;
    const userID = req.query.userID;

    if (!email && !userID) {
      const error = errorMessages.BAD_REQUEST();
      throw new HTTPError(error.status, error.message);
    }

    let queryParams = {
      TableName: tableName,
      FilterExpression: "entityType = :entityType",
    };

    if (email) {
      // TODO: validate email with AJV
      queryParams.IndexName = "EmailIndex";
      queryParams.KeyConditionExpression = "email = :email";
      queryParams.ExpressionAttributeValues = {
        ":email": email,
        ":entityType": "user",
      };
    } else if (userID) {
      const userPartitionKey = createKey(userID, "user");

      queryParams.KeyConditionExpression =
        "partitionKey = :userPartitionKey AND sortKey = :userPartitionKey";
      queryParams.ExpressionAttributeValues = {
        ":userPartitionKey": userPartitionKey,
        ":entityType": "user",
      };
    }

    const { Item } = await documentClient.query(queryParams).promise();

    if (Item === null) {
      const error = errorMessages.USER_DOES_NOT_EXIST();
      throw new HTTPError(error.status, error.message);
    }

    const response = successMessages.USER_RETRIEVED_SUCCESSFULLY(Item);
    return res.status(response.status).send(response);
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};

exports.handleUpdateUserByUserID = async (req, res, next) => {
  try {
    const userID = req.params.userID;

    // TODO: validate userID with AJS
    if (!userID) {
      const error = errorMessages.BAD_REQUEST();
      throw new HTTPError(error.status, error.message);
    }

    const reqUserPartitionKey = createKey(req.params.userID, "user");

    if (reqUserPartitionKey !== res.locals.userPartitionKey) {
      const error = errorMessages.NOT_AUTHORIZED();
      throw new HTTPError(error.status, error.message);
    }

    const newUserData = {};

    req.body.firstName && (newUserData.firstName = req.body.firstName);
    req.body.lastName && (newUserData.lastName = req.body.lastName);
    req.body.institutionName &&
      (newUserData.institutionName = req.body.institutionName);
    req.body.institutionDomain &&
      (newUserData.institutionDomain = req.body.institutionDomain);

    let updateString = "set";
    let ExpressionAttributeValues = {};

    Object.keys(newUserData).forEach((key) => {
      updateString += ` ${key} = :${key}`;
      ExpressionAttributeValues[`:${key}`] = newUserData[key];
    });

    updateString += " updatedAt = :updatedAt";
    ExpressionAttributeValues[":updatedAt"] = getISODateTime();

    const queryParams = {
      TableName: tableName,
      Key: {
        partitionKey: res.locals.userPartitionKey,
        sortKey: res.locals.userPartitionKey,
      },
      UpdateExpression: updateString,
      ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };
    await documentClient.update(queryParams).promise();

    const response = successMessages.USER_UPDATED_SUCCESSFULLY();
    return res.status(response.status).send(response);
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};

exports.handleDeleteUserByUserID = async (req, res, next) => {
  try {
    const userID = req.params.userID;

    // TODO: validate userID with AJS
    if (!userID) {
      const error = errorMessages.BAD_REQUEST();
      throw new HTTPError(error.status, error.message);
    }

    const reqUserPartitionKey = createKey(req.params.userID, "user");

    if (reqUserPartitionKey !== res.locals.userPartitionKey) {
      const error = errorMessages.NOT_AUTHORIZED();
      throw new HTTPError(error.status, error.message);
    }

    let queryParams = {
      TableName: tableName,
      KeyConditionExpression:
        "partitionKey = :userPartitionKey AND begins_with(sortKey, :groupSortKey)",
      FilterExpression: "entityType = :entityType",
      ExpressionAttributeValues: {
        ":userPartitionKey": res.locals.userPartitionKey,
        ":groupSortKey": "group",
        ":entityType": "group",
      },
    };
    const { Items } = await documentClient.query(queryParams).promise();

    const userGroupBatch = [];

    Items.forEach((groupData) => {
      userGroupBatch.push({
        DeleteRequest: {
          Key: {
            partitionKey: res.locals.userPartitionKey,
            sortKey: groupData.sortKey,
          },
        },
      });
    });

    userGroupBatch.push({
      DeleteRequest: {
        Key: {
          partitionKey: res.locals.userPartitionKey,
          sortKey: res.locals.userPartitionKey,
        },
      },
    });

    queryParams = {
      RequestItems: {
        [tableName]: userGroupBatch,
      },
    };

    await documentClient.batchWrite(queryParams).promise();

    const response = successMessages.USER_DELETED_SUCCESSFULLY();
    return res.status(response.status).send(response);
  } catch (err) {
    if (err.name === "HTTPError") {
      return next(err);
    }

    const error = errorMessages.INTERNAL_SERVER_ERROR();
    return next(error);
  }
};
