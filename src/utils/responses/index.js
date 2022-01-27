const ddbClient = require('../../dynamodb');

const dbGet = ({ query }) => {
  return new Promise((resolve, reject) => {
    ddbClient.get(query, (err, data) => {
      if (err) reject(err);
      else resolve(data?.Item);
    });
  });
};

const dbPut = ({ item }) => {
  return new Promise((resolve, reject) => {
    ddbClient.put(item, (err, data) => {
      if (err) reject(err);
      else resolve(data?.Item);
    });
  });
};

const dbQuery = ({ query }) => {
  return new Promise((resolve, reject) => {
    ddbClient.query(query, (err, data) => {
      if (err) reject(err);
      else resolve(data?.Items);
    });
  });
};

const dbScan = ({ query }) => {
  return new Promise((resolve, reject) => {
    ddbClient.scan(query, (err, data) => {
      if (err) reject(err);
      else resolve(data?.Items);
    });
  });
};

module.exports = {
  dbGet,
  dbPut,
  dbQuery,
  dbScan,
};