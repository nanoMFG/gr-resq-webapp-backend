"use strict";

// const dynamoose = require("../config/db");
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
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": "john.doe@gmail.com",
    },
  };
  const data = await documentClient.query(params).promise();
  console.log(data);
};

// describeTable("Entity");
getItem();
// batchWrite();