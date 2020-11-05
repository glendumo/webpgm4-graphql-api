/**
 * The Query Resolvers
 */

const { Product } = require("../mongo/models");

module.exports = {
    Query: {
        // get all products
        products: async () =>
            await Product.find().populate("categories").exec(),
        // get product based on id
        product: async (parent, { id }, context, info) =>
            await Product.findById(id).populate("categories").exec(),
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
