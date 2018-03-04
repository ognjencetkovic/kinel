var models = require('../models/');

exports.createEmployee = function (params, callback) {
    models(function (err, db) {
        console.log(params);
        db.models.employee.create(params, function (errors, employee) {
            if (!errors) {
                callback(employee);
            } else {
                callback(errors);
            }
        });
    });
}

exports.getEmployee = function (id, callback) {
    models(function (err, db) {
        db.models.employee.get(id, function (errors, employee) {
            if (!errors) {
                callback(employee);
            } else {
                callback(errors);
            }
        });
    });
}

exports.getEmployees = function (callback) {
    models(function (err, db) {
        db.models.employee.find().all(function (errors, employees) {
            if (employees){
                callback(employees);
            } else {
                callback(null);
            }
        });
    });
}