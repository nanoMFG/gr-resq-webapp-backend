"use strict";

const dynamoose = require("../config/db");
const { roles } = require("../config/index");

const roleSchema = new dynamoose.Schema({
  groupID: {
    type: String,
    required: true,
  },
  roleType: {
    type: String,
    enum: roles,
    required: true,
  },
});

const roleModel = dynamoose.model("Role", roleSchema, { create: false });

const rolesSchema = new dynamoose.Schema({
  roles: {
    type: [roleModel],
    required: true,
    default: [],
  },
});

const rolesModel = dynamoose.model("Roles", rolesSchema);

module.exports = { rolesModel, roleModel };


user = {
  name: "john",
  roles: [
    {
      groupID: 123,
      role: "basic",
    },
    {
      groupID: 456,
      role: "member"
    },
    {
      groupID: 789,
      role: "moderator"
    }
  ]
}