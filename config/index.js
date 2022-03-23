const path = require("path");
const helmet = require("helmet");
const parsedEnv = require("dotenv").config({
  path: path.join(__dirname, "../.env.development"),
});

if (parsedEnv.error) {
  throw parsedEnv.error;
}

const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  preflightContinue: true,
  credentials: true,
  optionsSuccessStatus: 204 || 200,
};

const helmetConfig = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
  },
});

module.exports = {
  port: Number(process.env.PORT) || 8080,
  IP: process.env.IP || "localhost",
  APIVersion: process.env.API_VERSION,
  JWTSecret: process.env.JWT_SECRET,
  JWTExpiryDuration: Number(process.env.JWT_EXPIRY_DURATION) || 86400,
  region: process.env.REGION,
  endpoint: process.env.ENDPOINT,
  accessKeyID: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  corsConfig,
  helmetConfig,
};