"use strict";

const { generateNewJWT, verifyJWT } = require(".");
const { dynamoDB, documentClient } = require("../config/db");
const { createTable } = require("../migrations/table");
const schema = require("../schemas/db");

const describeTable = async (TableName) => {
  try {
    const data = await dynamoDB.describeTable({ TableName }).promise();
    console.log(data.Table);
  } catch (e) {
    console.log(e);
  }
};

const batchWrite = async () => {
  const params = {
    RequestItems: {
      Entity: [
        {
          PutRequest: {
            Item: {
              partitionKey: "u#1234",
              sortKey: "g#1234",
            },
          },
        },
      ],
    },
  };

  await documentClient.batchWrite(params).promise();
};

const getItem = async () => {
  const params = {
    TableName: "Entity",
    IndexName: "UsernameIndex",
    KeyConditionExpression: "username :userName",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":userName": "john.doe",
      ":email": "john.doe@gmail.com"
    },
  };
  try {
    const data = await documentClient.query(params).promise();
    console.log(data);
  } catch(e) {
    console.log(e.name, e.message);
  }
  
};

// describeTable("Entity");
getItem();
// batchWrite();