const AWS = require('aws-sdk');

const { getHostDomain } = require('./utils/server');

if (getHostDomain() === 'localhost') {
  const config = {
    keyId: process.env.AWS_ACCESS_KEY_ID,
    accessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    endpoint: `http://localhost:${process.env.DYNAMODB_PORT}`
  };
  AWS.config.update(config);
};

const ddbClient = new AWS.DynamoDB.DocumentClient();

module.exports = ddbClient;