/**
 * The Subscription Resolvers
 */

const pubsub = require("./pubsub");

module.exports = {
    Subscription: {
        productAdded: {
            subscribe: () => pubsub.asyncIterator("PRODUCT_ADDED"),
        },
    },
};
