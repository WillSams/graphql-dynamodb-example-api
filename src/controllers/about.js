const properties = require('../../package.json');

//GET /api/about
exports.about = ((request, response) => {
  const aboutInfo = {
    name: properties.name,
    version: properties.version,
    description: properties.description
  };
  response.json(aboutInfo);
});