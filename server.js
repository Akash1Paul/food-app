
const dotenv = require("dotenv");
dotenv.config();

const connectDb = require("./config/db");
const app = require("./app");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDb();

        app.listen(PORT, () => {
            logger.info("Server started successfully", {
                port: PORT
            });
        });
    } catch (error) {
        logger.error("Failed to start server", {
            message: error.message,
            stack: error.stack
        });

        process.exit(1);
    }
};

startServer();