const AWS = require("aws-sdk");
AWS.config.update({
  region: "local",
  endpoint: "http://localhost:8000",
  accessKeyId: "example",
  secretAccessKey: "example",
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Scranton",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }, //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};
// dynamodb.createTable(params, function (err, data) {
//   if (err) {
//     console.error("Error JSON.", JSON.stringify(err, null, 2));
//   } else {
//     console.log("Created table.", JSON.stringify(data, null, 2));
//   }
// });

const JWT = require("jsonwebtoken");
const { JWTError } = require("../utils/errors");
const x = JWT.sign({ data: "foobar" }, "secret", { expiresIn: "1h" });

try {
  const y = JWT.verify(x, "secre");
} catch (e) {
  console.log(e.name);
}
