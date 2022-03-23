"use strict";

exports.errorHandler = (err, req, res, next) => {
  let error;

  if (err.type === "HTTPError") {
    error = {
      status: err.statusCode,
      message: err.message,
    };
  } else if (err.response.status) {
    error = {
      status: err.response.status,
      message: err.message,
    };
  } else {
    error = errorMessages.INTERNAL_SERVER_ERROR();
  }
  
  return res.status(error.status).send(error.message);
}