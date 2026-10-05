const categoryModel = require("../models/categoryModel");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");
// CREATE CAT
const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        //valdn
        // if (!title) {
        //     return res.status(500).send({
        //         success: false,
        //         message: "please provide category title or image",
        //     });
        // }
        if (!title) {
            throw new AppError("no food items was found", 500);
        }

        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        res.status(201).send({
            success: true,
            message: "category created",
            newCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create Cat API",
            error,
        });
    }
};

// GET ALL CAT
const getAllCatController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        // if (!categories) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "No Categories found",
        //     });
        // }
        if (!categories) {
            throw new AppError("No Categories found", 404);
        }
        res.status(200).send({
            success: true,
            totalCat: categories.length,
            categories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr in get All Categpry API",
            error,
        });
    }
};

// UPDATE CATE
const updateCatController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { title, imageUrl },
            { new: true }
        );
        // if (!updatedCategory) {
        //     return res.status(500).send({
        //         success: false,
        //         message: "No Category Found",
        //     });
        // }
        if (!updatedCategory) {
            throw new AppError("No Category Found", 500);
        }
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in update cat api",
            error,
        });
    }
};

// DLEETE CAT
const deleteCatController = async (req, res, next) => {
    try {
        const { id } = req.params;
        // if (!id) {
        //     return res.status(500).send({
        //         success: false,
        //         message: "Please provide Category ID",
        //     });
        // }
        if (!id) {
            throw new AppError("Please provide Category ID", 400);
        }
        if (!mongoose.isValidObjectId(id)) {
            throw new AppError("Invalid Category ID", 400);
        }
        const category = await categoryModel.findById(id);
        // if (!category) {
        //     return res.status(500).send({
        //         success: false,
        //         message: "No Category Found With this id",
        //     });
        // }
        if (!category) {
            throw new AppError("No Category Found With this id", 404);
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "category Deleted succssfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCatController,
    getAllCatController,
    updateCatController,
    deleteCatController,
};