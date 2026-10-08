const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Where uploaded files will be stored
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            crypto.randomBytes(16).toString("hex") +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const upload = multer({

    storage: storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    },

    fileFilter: function (req, file, cb) {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG, PNG and WEBP images are allowed"));
        }
    }
});

// Upload single file
app.post(
    "/upload",
    upload.array("files", 5),
    (req, res) => {

        console.log(req.files);

        res.status(201).json({
            success: true,
            message: "Files uploaded successfully",
            files: req.files
        });
    }
);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/catgeoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req, res) => {
    res.status(200).send(
        "<h1>Welcome to Food Server APP API BASE PROJECT</h1>"
    );
});

app.use(errorHandler);

module.exports = app;