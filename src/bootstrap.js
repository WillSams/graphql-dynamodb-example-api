const cors = require('cors');

const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const routes = require('./routes');
routes(app);

const initGqlServer = require('./initGqlServer');
initGqlServer(app);

// const bootstrap = app.listen(process.env.API_PORT, () => {
//   const host = bootstrap.address().address;
//   const port = bootstrap.address().port;

//   console.log('Backend API - listening at http://%s:%s', host, port);
// });

//if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
module.exports = app;
//} else module.exports = bootstrap; 
