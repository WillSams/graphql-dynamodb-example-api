const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const initGqlServer = async app => {
  const httpServer = createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
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