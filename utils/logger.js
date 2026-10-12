
const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),

    transports: [
        // Show logs in the terminal
        new winston.transports.Console(),

        // Store errors in a separate file
        new winston.transports.File({
            filename: path.join("logs", "error.log"),
            level: "error"
        }),

        // Store all info-level and more severe logs
        new winston.transports.File({
            filename: path.join("logs", "combined.log")
        })
    ]
});

module.exports = logger;