/**
 * The Mutation Resolvers
 */

const { Product, Category, User } = require("../mongo/models");
const pubsub = require("./pubsub");
const bcrypt = require("bcrypt");

module.exports = {
    Mutation: {
        addProduct: async (parent, { product }, { userId }) => {
            // check if the user is allowed
            if (!userId) throw new Error("You are not allowed to do this!");

            // find the categories for the given ids
            if (product.categories && product.categories.length > 0) {
                const categoryIds = product.categories.map(
                    (category) => category.id
                );
                categories = await Category.find({ _id: { $in: categoryIds } });
            }

            product.created_on = Date.now();

            // let the subscribers know we have added a product
            pubsub.publish("PRODUCT_ADDED", { productAdded: product });

            // create a new product in MongoDB and return all products
            await Product.create({ ...product, categories });
            return await Product.find().populate("categories").exec();
        },
        addCategory: async (parent, { category }, { userId }) => {
            // check if the user is allowed
            if (!userId) throw new Error("You are not allowed to do this!");

            // create a new category in MongoDB and return all categories
            await Category.create({ ...category });
            return await Category.find();
        },
        updateProduct: async (
            parent,
            { productID, updatedProduct },
            { userId }
        ) => {
            // check if the user is allowed
            if (!userId) throw new Error("You are not allowed to do this!");

            // find product based on ID, update data and return the product
            let product = await Product.findOneAndUpdate(
                { _id: productID },
                updatedProduct,
                {
                    new: true,
                }
            );
            return product;
        },
        updateCategory: async (
            parent,
            { categoryID, updatedCategory },
            { userId }
        ) => {
            // check if the user is allowed
            if (!userId) throw new Error("You are not allowed to do this!");

            // find category based on ID, update data and return the category
            let category = await Category.findOneAndUpdate(
                { _id: categoryID },
                updatedCategory,
                {
                    new: true,
                }
            );
            return category;
        },
        deleteProduct: async (parent, { productID }, { userId }) => {
            // check if the user is allowed
            if (!userId) throw new Error("You are not allowed to do this!");

            // find product based on ID, delete and return it
            let product = await Product.findOneAndDelete({ _id: productID });
            return product;
        },
        deleteCategory: async (parent, { categoryID }, { userId }) => {
            // check if the user is allowed
            if (!userId) throw new Error("You are not allowed to do this!");

            // find category based on ID, delete and return it
            let category = await Category.findOneAndDelete({ _id: categoryID });
            return category;
        },
        register: async (parent, { user }, context) => {
            const { email, password } = user;

            // validate if user exists
            const foundUser = await User.findOne({ email });
            if (foundUser) throw new Error("User already exists!");

            // create hash
            const hashedPassword = bcrypt.hashSync(password, 12);

            // create new user
            const newUser = await User.create({
                email,
                password: hashedPassword,
            });

            // reset the password for security
            newUser.password = "";

            // return the user
            return newUser;
        },
    },
};
