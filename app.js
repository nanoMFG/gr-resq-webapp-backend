"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const { port, IP, APIVersion, corsConfig, helmetConfig } = require("./config/index");
const { errorMessages } = require("./utils/constants");
const { HTTPError } = require("./utils/errors");
const { errorHandler } = require(`./api/${APIVersion}/handlers/errorHandlers`);
const routesHandler = require(`./api/${APIVersion}/routes/index`);

app.set("json spaces", 4);

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// morgan
app.use(morgan("dev"));

// helmet
app.use(helmet());
app.use(helmetConfig);

// cors
app.options(corsConfig);

// routes
app.use(`/api/${APIVersion}`, cors(corsConfig), routesHandler);

app.use("*", (req, res, next) => {
  try {
    const error = errorMessages.RESOURCE_NOT_FOUND();
    throw new HTTPError(error.status, error.message);
  } catch (error) {
    return next(error);
  }
});

// error handler
app.use(errorHandler);

if (typeof require !== 'undefined' && require.main === module) {
  app.listen(port, IP, () => {
    console.info(`Server running at http://${IP}:${port}`);
  });
}
