const { about_controller } = require('./controllers');

const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const routes = (app) => {
  [
    // public routes
    app.options('*', (req, res) => res.status(200).send()),

    app.get('/api/about', about_controller.about),
  ];
};

module.exports = routes;