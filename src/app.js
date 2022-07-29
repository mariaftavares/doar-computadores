const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv-safe').config();
const routes = require('./routes/apiRoutes')
app.use(cors());
app.use(express.json());
app.use(routes)

module.exports = app;