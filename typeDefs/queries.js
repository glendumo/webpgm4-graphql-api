/**
 * The GraphQL queries
 */

const { gql } = require("apollo-server");

module.exports = gql`
    type Query {
        products: [Product]
        product(id: ID): Product
        categories: [Category]
        category(id: ID): Category
        users: [User]
        user(id: ID): User
        login(user: UserInput): AuthData
    }
`;
