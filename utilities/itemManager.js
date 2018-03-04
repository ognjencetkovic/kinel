var models = require('../models/');

exports.createItem = function (params, callback) {
    models(function (err, db) {
        db.models.item.create(params, function (errors, item) {
            if (!errors) {
                callback(item);
            } else {
                callback(errors);
            }
        });
    });
}

exports.getItem = function (id, callback) {
    models(function (err, db) {
        db.models.item.get(id, function (errors, item) {
            if (!errors) {
                callback(item);
            } else {
                callback(errors);
            }
        });
    });
}

exports.getItems = function (callback) {
    models(function (err, db) {
        db.models.item.find().all(function (errors, items) {
            if (items){
                callback(items);
            } else {
                callback(null);
            }
        });
    });
}