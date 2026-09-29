const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRssturantController } = require('../controllers/resturantController');


const router = express.Router()

//routes
// CREATE RESTURANT || POST
router.post('/create', authMiddleware, createRssturantController);

module.exports = router;