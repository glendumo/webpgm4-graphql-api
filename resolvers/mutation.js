/**
 * The Mutation Resolvers
 */

const { Product, Category } = require("../mongo/models");
const pubsub = require("./pubsub");

module.exports = {
    Mutation: {
        addProduct: async (parent, { product }, context) => {
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
        addCategory: async (parent, { category }, context) => {
            // create a new category in MongoDB and return all categories
            await Category.create({ ...category });
            return await Category.find();
        },
        updateProduct: async (
            parent,
            { productID, updatedProduct },
            context
        ) => {
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
            context
        ) => {
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
        deleteProduct: async (parent, { productID }, context) => {
            // find product based on ID, delete and return it
            let product = await Product.findOneAndDelete({ _id: productID });
            return product;
        },
        deleteCategory: async (parent, { categoryID }, context) => {
            // find category based on ID, delete and return it
            let category = await Category.findOneAndDelete({ _id: categoryID });
            return category;
        },
    },
};
