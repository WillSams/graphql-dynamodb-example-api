const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const initGqlServer = async app => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const apolloRegistration = {
    app,
    path: '/api/graphql',
    cors: process.env.NODE_ENV !== 'development',
    bodyParserConfig: true,
  };
  server.applyMiddleware(apolloRegistration);
};

module.exports = initGqlServer;