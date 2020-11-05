/**
 * The GraphQL types
 */

const { gql } = require("apollo-server");

module.exports = gql`
    scalar Date

    enum Status {
        READ
        INTERESTED
        NEVER_READ
    }

    type Category {
        id: ID!
        name: String!
    }

    type Product {
        id: ID!
        title: String!
        description: String
        price: Float!
        images: [String!]!
        categories: [Category!]!
        created_on: Date
    }
`;
