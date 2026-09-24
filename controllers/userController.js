const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
// GET USER INFO
const getUserController = async (req, res) => {
    try {// find user

        const user = await userModel.findById({ _id: req.user.id });
        //validation'
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
            })
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
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
            })
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
const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer }  = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:'Please Provide All Feilds'
            });
        }
        const user = await userModel.findOne({email, answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User Not Found or invalid answer'
            })
        }
        // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message: "Password Reset Successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in password reset',
            err
        })
    }
};

module.exports = { getUserController, updateUserController, resetPasswordController };