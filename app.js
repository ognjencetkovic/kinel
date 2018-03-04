var express = require('express');
var environment = require('./config/environment');
var routes = require('./config/routes');

var app = express();

environment(app);
routes(app);