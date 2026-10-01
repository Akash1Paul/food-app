const restrurantModel = require("../models/restrurantModel");

// CREATE RESTURANT
const createRssturantController = async (req, res) => {
    try {
        const { title, imageUrl, foods, time, pickup, delivey, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body
        // validation
        if (!title || !coords) {
            return res.stataus(500).send({
                success: false,
                message: "please privide title and address",
            });
        }
        const newResturant = new restrurantModel({ title, imageUrl, foods, time, pickup, delivey, isOpen, logoUrl, rating, ratingCount, code, coords });
        await newResturant.save();

        res.status(201).send({
            success: true,
            message: 'New Resturant Created Successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Create Resturant API',
            err
        });
    }
}

// GET ALL RESRURANT
const getAllResturantController = async (req, res) => {
    try {
        const resturants = await restrurantModel.find({});
        if (!resturants) {
            return res.stataus(404).send({
                success: false,
                message: 'No Resturant Available'
            })
        }
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturants
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in get All Resturant API',
            err
        });
    }
};

// GET  RESRURANT BY ID
const getResturantByIdController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: 'Please Provide Resturant ID'
            });
        }
        // find resturant
        const resturant = await restrurantModel.findById(resturantId);
        if (!resturant) {
            return res.stataus(404).send({
                success: false,
                message: 'No Resturant Found'
            })
        }
        res.status(200).send({
            success: true,
            resturant
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Get Resturant By Id API',
            err
        });
    }
};

// DELETE RESTURANT
const deleteResturantController = async(req, res) =>{
    try {
        const resturantId = req.params.id;
         if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: 'No Resturant Found OR Provide Resturant ID'
            });
        }
        await restrurantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success: true,
            message: 'Resturant Deleted Successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in delete Resturant API',
            err
        });
    }
}



module.exports = { createRssturantController, getAllResturantController, getResturantByIdController, deleteResturantController };