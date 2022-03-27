const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errorMessages } = require("../utils/constants");
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

const rateLimiterConfig = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_INTERVAL),
  max: Number(process.env.RATE_LIMIT_ATTEMPTS),
  message: JSON.stringify(errorMessages.RATE_LIMIT_EXCEEDED(), null, 4),
  standardHeaders: true,
  legacyHeaders: false,
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
  rateLimitWindowInterval: Number(process.env.RATE_LIMIT_WINDOW_INTERVAL),
  rateLimitAttempts: Number(process.env.RATE_LIMIT_ATTEMPTS),
  roles: ["basic", "member", "moderator", "admin"],
  corsConfig,
  helmetConfig,
  rateLimiterConfig,
};
