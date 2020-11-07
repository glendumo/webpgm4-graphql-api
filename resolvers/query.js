/**
 * The Query Resolvers
 */

const { Product, Category, User } = require("../mongo/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    Query: {
        // get all products
        products: async () =>
            await Product.find().populate("categories").exec(),
        // get product based on id
        product: async (parent, { id }, context, info) =>
            await Product.findById(id).populate("categories").exec(),
        // get all categories
        categories: async () => await Category.find(),
        // get category based on id
        category: async (parent, { id }, context, info) =>
            await Category.findById(id),
        // get all users
        users: async () => await User.find(),
        // get user based on id
        user: async (parent, { id }, context, info) => await User.findById(id),
        // login user and return jwt
        login: async (parent, { user }, context) => {
            const { email, password } = user;

            // validate if user exists
            const foundUser = await User.findOne({ email });
            if (!foundUser) throw new Error("User does not exist!");

            // check if password is correct
            const isEquel = bcrypt.compareSync(password, foundUser.password);
            if (!isEquel) throw new Error("Password is incorrect!");

            // create the webtoken
            const token = jwt.sign(
                {
                    userId: foundUser._id,
                    email: foundUser.email,
                },
                process.env.TOKEN_SALT,
                { expiresIn: "1h" }
            );

            // return the authdata
            return {
                userId: foundUser._id,
                token,
            };
        },
    },

    // replace string values into category objects depending on the category id's
    Product: {
        categories: async ({ categories }, args, context) => {
            return categories.map(({ _id, name }) => ({
                id: _id,
                name,
            }));
        },
    },
};
