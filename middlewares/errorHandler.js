
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    logger.error("Request failed", {
        method: req.method,
        url: req.originalUrl,
        statusCode,
        message: err.message,
        stack: err.stack
    });

    res.status(statusCode).json({
        success: false,
        status: err.status || "error",
        message: err.isOperational
            ? err.message
            : "Internal Server Error"
    });
};

module.exports = errorHandler;