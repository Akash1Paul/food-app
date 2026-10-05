const errorHandler = (err, req, res, next) => {

    console.log("Error:", err);

    res.status(err.statusCode || 500).json({
        success: false,
        status: err.status || "error",
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorHandler;