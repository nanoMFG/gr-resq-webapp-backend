"use strict";

const dbSchema = {
  TableName: "Entity",
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
  AttributeDefinitions: [
    {
      AttributeName: "partitionKey",
      AttributeType: "S",
    },
    {
      AttributeName: "sortKey",
      AttributeType: "S",
    },
    {
      AttributeName: "userID",
      AttributeType: "B",
    },
    {
      AttributeName: "username",
      AttributeType: "S",
    },
    {
      AttributeName: "email",
      AttributeType: "S",
    },
    {
      AttributeName: "entityType",
      AttributeType: "S",
    },
    {
      AttributeName: "firstName",
      AttributeType: "S",
    },
    {
      AttributeName: "lastName",
      AttributeType: "S",
    },
    {
      AttributeName: "passwordHash",
      AttributeType: "B",
    },
    {
      AttributeName: "institutionName",
      AttributeType: "S",
    },
    {
      AttributeName: "institutionDomain",
      AttributeType: "S",
    },
    {
      AttributeName: "institutionCountry",
      AttributeType: "S",
    },
    {
      AttributeName: "groupID",
      AttributeType: "B",
    },
    {
      AttributeName: "groupName",
      AttributeType: "S",
    },
    {
      AttributeName: "groupRole",
      AttributeType: "S",
    },
    {
      AttributeName: "isGroupPrivate",
      AttributeType: "S",
    },
    {
      AttributeName: "experimentID",
      AttributeType: "N",
    },
    {
      AttributeName: "isExperimentPrivate",
      AttributeType: "S",
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: "EmailIndex",
      KeySchema: [
        {
          AttributeName: "email",
          KeyType: "HASH",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    },
    {
      IndexName: "UsernameIndex",
      KeySchema: [
        {
          AttributeName: "username",
          KeyType: "HASH",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    },
  ],
};

module.exports = dbSchema;
