/**
 * Importing mongoose
 */

const mongoose = require("mongoose");

/**
 * Importing schemas
 */

const ProductSchema = require("./schemas/product");
const CategorySchema = require("./schemas/category");

/**
 * Creating mongoose models
 */

const Product = mongoose.model("Product", ProductSchema);
const Category = mongoose.model("Category", CategorySchema);

/**
 * Exporting the models
 */

module.exports = {
    Product,
    Category,
};
