"use strict";

exports.errorHandler = (err, req, res, next) => {
  let error;

  if (err.name === "HTTPError") {
    error = {
      status: err.statusCode,
      message: err.message,
    };
  } else {
    error = errorMessages.INTERNAL_SERVER_ERROR();
  }

  return res.status(error.status).send(error.message);
};
