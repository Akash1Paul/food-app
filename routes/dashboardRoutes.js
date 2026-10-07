const express = require("express");

const {
    dashboardController
} = require("../controllers/dashboardController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    dashboardController
);

module.exports = router;