const cors = require('cors');
const express = require('express');
const app = express();

const { getHostDomain } = require('./utils/server');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (getHostDomain() === 'localhost') app.use(cors());

const routes = require('./routes');
routes(app);

const initGqlServer = require('./initGqlServer');
initGqlServer(app);

module.exports = app;
