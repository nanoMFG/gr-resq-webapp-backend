"use strict";

class HTTPError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.type = "HTTPError";
    this.statusCode = statusCode;
  }
}

module.exports = { HTTPError };