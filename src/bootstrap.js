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

module.exports = app;
