const mongoose = require("mongoose");

const connectDb = async (uri = process.env.MONGO_URL) => {
    try {
        await mongoose.connect(uri);

        console.log(
            `Connected To Database ${mongoose.connection.host}`
        );
    } catch (error) {
        console.error("DB Error:", error.message);
        throw error; // IMPORTANT
    }
};

module.exports = connectDb;