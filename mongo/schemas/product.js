/**
 * Modelling the product
 */

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    images: [String],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
    created_on: Date,
});

module.exports = ProductSchema;
