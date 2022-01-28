const { ApolloServer } = require('apollo-server-express');
const { ApolloError } = require('apollo-server-errors');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const initGqlServer = async app => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      if (req?.headers?.authorization !== `Bearer ${process.env.TOKEN_SECRET}`) {
        const message = 'You are not authorized to make requests to this API\'s GraphQL endpoints';
        throw new ApolloError(message, null);
      }
    },
    formatError: (err) => err.message,
  });

  await server.start();

  const apolloRegistration = {
    app,
    path: '/api/graphql',
    cors: true,
    bodyParserConfig: true,
  };
  server.applyMiddleware(apolloRegistration);
};

module.exports = initGqlServer;