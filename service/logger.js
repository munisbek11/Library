const { createLogger, format, transports } = require("winston");
require('winston-mongodb');
const { combine, timestamp, printf, colorize, json } = format;
require("dotenv").config()

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}]  (${level}): ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    myFormat,
    colorize({ all: true })
  ),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({ filename: "logs/errors.log", level: "error" }),
    new transports.MongoDB({db: process.env.MONGOURI})
  ],
});

const loggerJSON = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), 
    myFormat,
    colorize({all: true})
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `logs/${new Date().toISOString().split("T")[0]}-logs.json`,
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        json({space: 4})
      )
    }),
  ],
});

module.exports = {
  logger,
  loggerJSON,
};
