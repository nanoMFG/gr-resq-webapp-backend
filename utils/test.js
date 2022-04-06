"use strict";

// const dynamoose = require("../config/db");
const { dynamoDB, documentClient } = require("../config/db");

const schema = {
  AttributeDefinitions: [
    {
      AttributeName: "partitionKey",
      AttributeType: "S",
    },
    {
      AttributeName: "sortKey",
      AttributeType: "S",
    },
  ],
  KeySchema: [
    {
      AttributeName: "partitionKey",
      KeyType: "HASH",
    },
    {
      AttributeName: "sortKey",
      KeyType: "RANGE",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
  TableName: "Entity",
};

const createTable = async () => {
  try {
    await dynamoDB.createTable(schema).promise();
    console.log("table created");
  } catch (e) {
    console.log(e);
  }
};

const describeTable = async () => {
  try {
    const { Table } = await dynamoDB
      .describeTable({ TableName: "Entity" })
      .promise();
    console.log(Table.TableStatus);
  } catch (e) {
    console.log(e);
  }
};

const batchPutItems = async () => {
  try {
    await documentClient.batchWrite({
      RequestItems: {
        Entity: [
          {
            PutRequest: {
              Item: {
                partitionKey: "u#5678",
                sortKey: "u#5678",
                entityType: "user",
                firstName: "John",
                lastName: "Doe",
                username: "john.doe",
                email: "john.doe@gmail.com",
                passwordHash: "fdskdnflknaskjdbgkj2b4",
                createdAt: new Date(Date.now()).toISOString(),
                updatedAt: new Date(Date.now()).toISOString(),
                institutionName: "UIUC",
                institutionDomain: "illinois.edu",
                institutionCountry: "USA",
              },
            },
          },
          {
            PutRequest: {
              Item: {
                partitionKey: "u#1234",
                sortKey: "g#8573",
                entityType: "group",
                groupName: "Gr-ResQ",
                groupRole: "moderator",
                isGroupPrivate: true,
                createdAt: new Date(Date.now()).toISOString(),
                updatedAt: new Date(Date.now()).toISOString(),
              },
            },
          },
        ],
      },
    }).promise();
  } catch (e) {
    console.log(e);
  }
};

const getItem = async () => {
  try {
    const data = await documentClient
      .get({
        TableName: "Entity",
        Key: {
          partitionKey: "u#1234",
          sortKey: "u#1234",
        }
      })
      .promise();
    console.log(data.Item);
  } catch (e) {
    console.log(e);
  }
};

// createTable();
// describeTable();
// batchPutItems()
getItem();