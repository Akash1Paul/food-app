const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const AppError = require("../utils/AppError");
//
const registerController = async (req, res, next) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body
        //validation
        if (!userName || !email || !password || !address || !phone || !answer) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }
        //check user
        const existing = await userModel.findOne({ email })
        // if(existing) {
        //     return res.status(500).send({
        //         success:false,
        //         message:'Email Already Registered Please Login'
        //     })
        // }
        if (existing) {
            throw new AppError("Email Already Registered Please Login", 500);
        }
        //hashing Password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //Create new user
        const user = await userModel.create({ userName, email, password: hashedPassword, address, phone, answer })
        res.status(201).send({
            success: true,
            message: 'Successfully Registered',
            user: user
        })
    } catch (error) {
        next(error);
    }
};

//  LOGIN
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide Email OR Password'
            });
        }
        //check user
        const user = await userModel.findOne({ email })
        // if (!user) {
        //     return res.status(404).send({
        //         success: false,
        //         message: 'User Not Found'
        //     })
        // }
        if (!user) {
            throw new AppError("User not found", 404);
        }
        //check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password)
        // if (!isMatch) {
        //     return res.status(500).send({
        //         success: false,
        //         message: 'Invalid Password',
        //     });
        // }
        if (!isMatch) {
            throw new AppError("Invalid Password", 500);
        }
        //token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            token,
            user,
        })
    } catch (error) {
        next(error);
    }
};

module.exports = { registerController, loginController }