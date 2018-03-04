
var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var settings = require('./settings');
var models   = require('../models/');
var MySQLStore = require('express-mysql-session')(session);

module.exports = function (app) {
    app.set('port', process.env.PORT || 5000);
    app.set('views', [
        settings.path + '/views',
        settings.path + '/views/dashboard', 
        settings.path + '/views/project',
        settings.path + '/views/employee',
        settings.path + '/views/item'
    ]);
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use("/public", express.static(path.join(settings.path, 'public')));
    app.use('/favicon.ico', express.static('/public/images/favicon.ico'));
    var sessionStore = new MySQLStore(settings.database);
    app.use(function (req, res, next) {
        models(function (err, db) {
            if (err) return next(err);
            req.models = db.models;
            req.db = db;
            return next();
        });
    }),
    app.use(session({
        secret: 'secret',
        store: sessionStore,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: (30 * 86400 * 1000) }
    }));
    
    app.listen(process.env.PORT || 5000);
};