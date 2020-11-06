/**
 * The Query Resolvers
 */

const { Product, Category } = require("../mongo/models");

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
