/**
 * The GraphQL types
 */

const { gql } = require("apollo-server");

module.exports = gql`
    scalar Date

    enum Platform {
        PlayStation
        Xbox
        PC
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
        platform: Platform!
        images: [String!]!
        categories: [Category!]!
        created_on: Date
    }

    type User {
        id: ID!
        email: String!
        password: String!
        isAdmin: Boolean
    }

    type AuthData {
        userId: ID
        token: String
    }
`;
