const properties = require('../../package.json');

//GET /api/about
exports.about = ((request, response) => {
  const aboutInfo = {
    name: properties.name,
    version: properties.version,
    description: properties.description,
    environment: process?.env?.NODE_ENV || 'unknown',
  };
  response.json(aboutInfo);
});