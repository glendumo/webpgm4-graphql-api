/**
 * A GraphQL template
 * More Information: https://graphql.org/
 */

/**
 * Importing some libraries
 */

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

/**
 * Mongoose Database
 */

const openMongoDB = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DB_CONNECTIONSTRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        mongoose.connection.on("error", (e) => reject(e.message));
        mongoose.connection.once("open", () => resolve());
    });
};

/**
 * Create an Apollo Server instance
 */

const startServer = () => {
    return new Promise((resolve, reject) => {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true,
            playground: true,
            context: ({ req }) => {
                const authHeader = req.headers["authorization"];
                const token = authHeader && authHeader.split(" ")[1];
                try {
                    const decodedToken = jwt.verify(
                        token,
                        process.env.TOKEN_SALT
                    );
                    return decodedToken && decodedToken.userId
                        ? { userId: decodedToken.userId }
                        : { userId: "" };
                } catch {
                    return { userId: "" };
                }
            },
        });
        server
            .listen({
                port: process.env.PORT || process.env.GRAPHQL_PORT || 4000,
            })
            .then(({ url }) => {
                resolve(url);
            });
    });
};

/**
 * Start the API
 */

openMongoDB()
    .then(startServer)
    .then((url) => console.log(`Server started at ${url}`))
    .catch((e) => console.error(e));
