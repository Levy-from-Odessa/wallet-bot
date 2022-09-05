"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var morgan = require('morgan');

var _require = require('./models'),
    sequelize = _require.sequelize;

var config = require('../config/index');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes/tags')(app);

require('./routes/operations')(app);

sequelize.sync({
  force: true
}).then(function () {
  app.listen(config.port);
  console.log(config.port);
});