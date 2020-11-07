/**
 * The GraphQL inputs
 */

const { gql } = require("apollo-server");

module.exports = gql`
    input ProductInput {
        id: ID
        title: String
        description: String
        price: Float
        platform: Platform
        images: [String]
        categories: [CategoryIDInput]
    }

    input CategoryInput {
        name: String
    }

    input CategoryIDInput {
        id: ID
    }

    input UserInput {
        email: String
        password: String
    }
`;
