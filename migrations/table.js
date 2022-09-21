"use strict";

const { dynamoDB, documentClient } = require("../config/db");
const { backoffInterval,tableName } = require("../config/index");


const checkTableStatus = async (tableName) => {
  try {
    const { Table } = await dynamoDB
      .describeTable({ TableName: tableName })
      .promise();

    return Table.TableStatus;
  } catch (error) {
    console.log(error);
  }
};

const waitForTable = async (tableName) => {
  try {
    const tableStatus = await checkTableStatus(tableName);

    if (tableStatus !== "ACTIVE") {
      console.log(
        `Table status: ${tableStatus}, retrying in ${backoffInterval}ms...`
      );
      return new Promise((resolve) => {
        setTimeout(() => waitForTable().then(resolve), backoffInterval);
      });
    }
    return `Table ${tableName} is ACTIVE.`;
  } catch (error) {
    console.log(
      `Table not found! Error below. Retrying in ${backoffInterval} ms...`,
      error
    );
    return new Promise((resolve) => {
      setTimeout(() => waitForTable().then(resolve), backoffInterval);
    });
  }
};

const createTable = async (tableSchema) => {
  console.log("Creating table...");
  try {
    const { TableNames } = await dynamoDB.listTables().promise();

    if(TableNames.includes(tableName)) {
    // if (TableNames.includes(tableSchema.TableName)) {
      console.log(`Table ${tableName} already exists.`);
      return `Table ${tableSchema.TableName} already exists.`;
    }
    console.log("Creating table now...");
    await dynamoDB.createTable(tableSchema).promise();
    await waitForTable(tableSchema.TableName);
    console.log(`Table ${tableSchema.TableName} created successfully.`);
    return `Table ${tableSchema.TableName} created successfully.`;
  } catch (error) {
    console.log(error);
  }
};

const deleteTable = async (tableName) => {
  try {
    const { TableNames } = await dynamoDB.listTables().promise();

    if (TableNames.includes(tableName) === false) {
      return `Table ${tableName} does not exist.`;
    }

    const tableStatus = await checkTableStatus(tableName);

    if (tableStatus !== "ACTIVE") {
      return `Cannot delete Table ${tableName} as it is in ${tableStatus} state.`;
    }

    await dynamoDB.deleteTable({ TableName: tableName }).promise();
    return `Table ${tableName} deleted successfully.`;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkTableStatus,
  createTable,
  deleteTable,
  waitForTable,
};
