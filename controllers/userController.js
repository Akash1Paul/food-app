const userModel = require("../models/userModel");

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
        const {userName, address, phone} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) uxer.phone = phone
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

module.exports = { getUserController, updateUserController };