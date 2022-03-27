"use strict";

module.exports = {
  handleLogIn: async (req, res, next) => {
    return res.send({message: "hello login"});
  },

  handleLogOut: async (req, res, next) => {
    return res.send({message: "hello logout"});
  },
}