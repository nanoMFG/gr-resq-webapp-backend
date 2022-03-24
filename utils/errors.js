"use strict";

class HTTPError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.type = "HTTPError";
    this.statusCode = statusCode;
  }
}

class JWTError extends Error {
  constructor(message) {
    super(message);
    this.type = "JWTError";
  }
}

module.exports = { HTTPError, JWTError };
