const serverless = require('serverless-http');

const bootstrap = require('./src/bootstrap');

module.exports.handler = serverless(bootstrap);