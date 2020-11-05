/**
 * A GraphQL template
 * More Information: https://graphql.org/
 */

/**
 * Importing some libraries
 */

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

/**
 * Mongoose Database
 */

mongoose.connect(process.env.DB_CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

/**
 * Create an Apollo Server instance
 */

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req }) => {
        // console.log(req);
    },
});

/**
 * Connect the Database & Start the server
 */

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
    server
        .listen({
            port: process.env.PORT || process.env.GRAPHQL_PORT || 4000,
        })
        .then(({ url }) => {
            console.log(`Server started at ${url}`);
        });
});
