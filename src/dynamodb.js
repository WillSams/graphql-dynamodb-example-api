const AWS = require('aws-sdk');

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
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