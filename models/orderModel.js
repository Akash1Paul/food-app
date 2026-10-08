const mongoose = require("mongoose");

//schema
const ordersSchema = new mongoose.Schema(
    {
        foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
        payment: {},
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            default: "Pending"
        },
        amount: Number
    },
    { timestamps: true }
);

//export
module.exports = mongoose.model("Orders", ordersSchema);