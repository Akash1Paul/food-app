const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

beforeAll(async () => {
    console.log("Connecting to TEST MongoDB...");
    console.log("Mongo URL:", process.env.MONGO_TEST_URL);

    try {
        await mongoose.connect(process.env.MONGO_TEST_URL, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("TEST MongoDB connected");
    } catch (error) {
        console.error("TEST MongoDB connection failed:");
        console.error(error.message);
        throw error;
    }
});

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log("TEST MongoDB disconnected");
    }
});