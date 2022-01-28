const { about_controller } = require('./controllers');

const routes = (app) => {
  [
    // public routes
    app.options('*', (req, res) => res.status(200).send()),

    app.get('/api/about', about_controller.about),
  ];
};

module.exports = routes;