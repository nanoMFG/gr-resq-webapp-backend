"use strict";

const dbSchema = {
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

module.exports = dbSchema;
