"use strict";

class HTTPError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "HTTPError";
    this.statusCode = statusCode;
  }
}

module.exports = { HTTPError, JWTError };
