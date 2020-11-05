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
            // find product based on productID arg
            const product = await Product.findById(productID)
                .populate("categories")
                .exec();

            product = updatedProduct;

            // save the changes to the product and return it
            await product.save();
            return product;
        },
    },
};
