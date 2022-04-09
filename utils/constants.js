"use strict";

exports.errorMessages = {
  AUTHENTICATION_UNSUCESSFUL: () => ({
    status: 401,
    message: "Authentication unsuccessful.",
  }),

  RESOURCE_NOT_FOUND: () => ({
    status: 404,
    message: "Requested resource was not found.",
  }),

  BAD_REQUEST: () => ({
    status: 400,
    message: "Missing or incorrect field/header",
  }),

  SERVICE_TEMPORARILY_UNAVAILABLE: () => ({
    status: 503,
    message: "Service is temporarily unavailable.",
  }),

  INTERNAL_SERVER_ERROR: () => ({
    status: 500,
    message: "Internal Server Error.",
  }),

  INVALID_JWT: () => ({
    status: 401,
    message: "Authentication unsuccessful. Invalid JWT.",
  }),

  INVALID_CREDENTIALS: () => ({
    status: 401,
    message: "Invalid username/email or password."
  }),

  USER_DOES_NOT_EXIST: () => ({
    status: 401,
    message: "Authentication unsuccessful. User does not exist.",
  }),

  USER_ALREADY_EXISTS: () => ({
    status: 422,
    message: "Registration unsuccessful. User already exists."
  }),

  RATE_LIMIT_EXCEEDED: () => ({
    status: 429,
    message: "Too many requests. Please try again later.",
  }),
};

exports.successMessages = {
  LOGGED_IN_SUCCESSFULLY: (data) => ({
    status: 200,
    message: "Logged in successfully.",
    data,
  }),

  USER_REGISTERED_SUCCESSFULLY: (data) => ({
    status: 201,
    message: "Logged in successfully.",
    data,
  }),
};
