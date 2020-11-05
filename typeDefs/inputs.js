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
        images: [String]
        categories: [CategoryInput]
        created_on: Date
    }

    input CategoryInput {
        id: ID
    }
`;
