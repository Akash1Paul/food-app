const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRssturantController, getAllResturantController, getResturantByIdController } = require('../controllers/resturantController');


const router = express.Router()

//routes
// CREATE RESTURANT || POST
router.post('/create', authMiddleware, createRssturantController);

// GET ALL RESTURANT || GET
router.get('/getAll', getAllResturantController);

// GET RESTURANT BY ID || GET
router.get('/get/:id', getResturantByIdController);

module.exports = router;