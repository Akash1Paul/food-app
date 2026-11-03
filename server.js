require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const connectDb = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

// Create HTTP server using Express app
const httpServer = http.createServer(app);

// Attach Socket.IO to HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Make Socket.IO available to Express controllers
app.set("io", io);

// Socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start server
const startServer = async () => {
    try {
        await connectDb();

        httpServer.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();