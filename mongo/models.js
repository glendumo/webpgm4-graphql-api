/**
 * Importing mongoose
 */

const mongoose = require("mongoose");

/**
 * Importing schemas
 */

const ProductSchema = require("./schemas/product");
const CategorySchema = require("./schemas/category");
const UserSchema = require("./schemas/user");

/**
 * Creating mongoose models
 */

const Product = mongoose.model("Product", ProductSchema);
const Category = mongoose.model("Category", CategorySchema);
const User = mongoose.model("User", UserSchema);

/**
 * Exporting the models
 */

module.exports = {
    Product,
    Category,
    User,
};
