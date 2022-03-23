"use strict";

module.exports = {
  handleRegistration: async (req, res, next) => {
    return res.send({message: "hello registration"});
  },

  handleLogIn: async (req, res, next) => {
    return res.send({message: "hello login"});
  },

  handleLogOut: async (req, res, next) => {
    return res.send({message: "hello logout"});
  },
}