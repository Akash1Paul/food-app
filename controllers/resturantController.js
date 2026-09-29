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
            success:true,
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

module.exports = { createRssturantController };