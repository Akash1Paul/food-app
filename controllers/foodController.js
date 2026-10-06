const foodModal = require("../models/foodModal");
const orderModel = require("../models/orderModel");
const AppError = require("../utils/AppError");
// CREATE FOOD
const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturnat,
            rating,
        } = req.body;

        if (!title || !description || !price || !resturnat) {
            return res.status(500).send({
                success: false,
                message: "Please Provide all fields",
            });
        }
        const newFood = new foodModal({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturnat,
            rating,
        });

        await newFood.save();
        res.status(201).send({
            success: true,
            message: "New Food Item Created",
            newFood,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create food api",
            error,
        });
    }
};

// GET ALLL FOODS
const getAllFoodsController = async (req, res) => {
    try {
        const foods = await foodModal.find({});
        if (!foods) {
            throw new AppError("no food items was found", 404);
        }

        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erro In Get ALL Foods API",
            error,
        });
    }
};

// GET SINGLE FOOD
const getSingleFoodController = async (req, res, next) => {
    try {
        const foodId = req.params.id;
        // if (!foodId) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "please provide id",
        //     });
        // }
        if (!foodId) {
            throw new AppError("please provide id", 404);
        }

        const food = await foodModal.findById(foodId);
        // if (!food) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "No Food Found with htis id",
        //     });
        // }
        if (!food) {
            throw new AppError("No Food Found with htis id", 404);
        }
        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        next(error);
    }
};

// GET FOOD BY RESTURANT
const getFoodByResturantController = async (req, res, next) => {
    try {
        const resturantId = req.params.id;
        if (!resturantId) {
            throw new AppError("please provide id", 404);
        }
        const food = await foodModal.find({ resturnat: resturantId });
        // if (!food) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "No Food Found with htis id",
        //     });
        // }
        if (!food) {
            throw new AppError("No Food Found with htis id", 404);
        }
        res.status(200).send({
            success: true,
            message: "food base on restuatrn",
            food,
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE FOOD ITEm
const updateFoodController = async (req, res, next) => {
    try {
        const foodID = req.params.id;
        // if (!foodID) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "no food id was found",
        //     });
        // }
        if (!food) {
            throw new AppError("no food id was found", 404);
        }
        const food = await foodModal.findById(foodID);
        // if (!food) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "No Food Found",
        //     });
        // }
        if (!food) {
            throw new AppError("No Food Found", 404);
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            catgeory,
            code,
            isAvailabe,
            resturnat,
            rating,
        } = req.body;
        const updatedFood = await foodModal.findByIdAndUpdate(
            foodID,
            {
                title,
                description,
                price,
                imageUrl,
                foodTags,
                catgeory,
                code,
                isAvailabe,
                resturnat,
                rating,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Food Item Was Updated",
        });
    } catch (error) {
        next(error);
    }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        // if (!foodId) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "provide food id",
        //     });
        // }
        if (!foodId) {
            throw new AppError("provide food id", 404);
        }
        const food = await foodModal.findById(foodId);
        // if (!food) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "No Food Found with id",
        //     });
        // }
        if (!food) {
            throw new AppError("No Food Found with id", 404);
        }
        await foodModal.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "Food Item Deleted ",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror In Delete Food APi",
            error,
        });
    }
};

// PLACE ORDER
const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body;
        // if (!cart) {
        //     return res.status(500).send({
        //         success: false,
        //         message: "please food cart or payemnt method",
        //     });
        // }
        if (!cart) {
            throw new AppError("please food cart or payemnt method", 500);
        }
        let total = 0;
        //cal
        cart.map((i) => {
            total += i.price;
        });

        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer: req.body.id,
        });
        await newOrder.save();
        res.status(201).send({
            success: true,
            message: "Order Placed successfully",
            newOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr In Place Order API",
            error,
        });
    }
};

// CHANGE ORDER STATUS
const orderStatusController = async (req, res, next) => {
    try {
        const orderId = req.params.id;

        if (!orderId) {
            throw new AppError("Please provide valid order id", 400);
        }

        const { status } = req.body || {};

        if (!status) {
            throw new AppError("Please provide order status", 400);
        }

        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        )
            .populate("buyer", "name email")
            .populate("foods", "name price");

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        res.status(200).send({
            success: true,
            message: "Order Status Updated",
            order
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByResturantController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController,
};