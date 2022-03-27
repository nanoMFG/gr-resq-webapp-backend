"use strict";

const dynamoose = require("../config/db");

const groupMembersSchema = new dynamoose.Schema({
  domain: {
    type: String,
    hashKey: true,
    required: true,
  },
  username: {
    type: String,
    rangeKey: true,
    required: true,
  },
});

const groupMembersModel = dynamoose.model("GroupMembers", groupMembersSchema, {
  create: false,
});

const groupsSchema = new dynamoose.Schema({
  groupID: {
    type: String,
    hashKey: true,
    rangeKey: true,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  moderators: {
    type: [groupMembersModel],
    required: true,
    default: [],
  },
  members: {
    type: [groupMembersModel],
    required: true,
    default: [],
  },
  experiments: {
    type: [Number],
    required: true,
    default: [],
  },
  isPrivate: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const groupsModel = dynamoose.Schema("Groups", groupsSchema);
