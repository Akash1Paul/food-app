const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require("../middlewares/validate");
const { resetPasswordSchema } = require("../validations/authValidation");

const router = express.Router()

//routes
// GET USER || GET
router.get('/getUser', authMiddleware, getUserController)

//UPDATE PROFILE
router.put('/updateUser', authMiddleware, updateUserController);

// RESET PASSWORD
router.post("/reset-password", validate(resetPasswordSchema), resetPasswordController);

//PASSWORD UPDATE
router.post('/updatePassword', authMiddleware, updatePasswordController);

// DELETE USER
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;