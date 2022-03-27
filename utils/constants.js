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
    message: "Missing or incorrect field TicketID.",
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
    message: "Invalid JWT.",
  }),

  USER_DOES_NOT_EXIST: () => ({
    status: 404,
    message: "User does not exist.",
  }),

  RATE_LIMIT_EXCEEDED: () => ({
    status: 429,
    message: "Too many requests. Please try again later.",
  }),
};

exports.successMessages = {};
