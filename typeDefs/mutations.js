/**
 * The GraphQL mutations
 */

const { gql } = require("apollo-server");

module.exports = gql`
    type Mutation {
        addProduct(product: ProductInput): [Product]
        addCategory(category: CategoryInput): [Category]
        updateProduct(productID: ID, updatedProduct: ProductInput): Product
    }
`;
