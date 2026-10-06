const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const AppError = require("../utils/AppError");
// GET USER INFO
const getUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.user.id });
        //validation
        if (!user) {
            throw new AppError("User not found", 404);
        }
        //hide password
        user.password = undefined
        //resp
        res.status(200).send({
            success: true,
            message: 'User get Successfully',
            user
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in Get User',
            err
        })
    }
};

// UPDATE USER
const updateUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.user.id });
        // validation
        if (!user) {
            throw new AppError("User not found", 404);
        }
        //update
        const { userName, address, phone } = req.body
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) uxer.phone = phone
        //Save
        await user.save()
        res.status(200).send({
            success: true,
            message: "User Updated Successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in Update User',
            err
        })
    }
};

// RESET PASSWORD
const resetPasswordController = async (req, res, next) => {
    try {
        const { email, newPassword, answer } = req.body;
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            throw new AppError("User Not Found or invalid answer", 404);
        }
        // hashing password
        var salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        next(error);
    }
};

// UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById(req.user.id);
        //validation
        if (!user) {
            throw new AppError("User not found", 404);
        }
        // get data from user
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide old or New Password',
                err
            });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Password',
            });
        }
        // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated !"
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Password Update API',
            err
        });
    }
};

// DELETE USER
const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message: "Your accont has been deleted",
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Delete User API',
            err
        });
    }
}
module.exports = { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController };