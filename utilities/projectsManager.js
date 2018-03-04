var models = require('../models/');

exports.createProject = function (params, callback) {
    models(function (err, db) {
        db.models.project.create(params, function (errors, project) {
            if (!errors) {
                callback(project);
            } else {
                callback(errors);
            }
        });
    });
}

exports.updateProject = function (id, params, callback) {
    models(function (err, db) {
        db.models.project.get(id, function (errors, project) {
            if (!errors) {
                project.title = params.title;
                project.number = params.number;
                project.save();
                callback(project);
            } else {
                callback(errors);
            }
        });
    });
}

exports.getProject = function (id, callback) {
    models(function (err, db) {
        db.models.project.get(id, function (errors, project) {
            if (!errors) {
                callback(project);
            } else {
                callback(errors);
            }
        });
    });
}

exports.getProjects = function (callback) {
    models(function (err, db) {
        db.models.project.find().all(function (errors, projects) {
            if (projects){
                callback(projects);
            } else {
                callback(null);
            }
        });
    });
}

exports.addEmployeeToProject = function (project, employee, numberOfHours, callback) {
    models(function (err, db) {
        numberOfHours = parseInt(numberOfHours.split(":")[0]) * 60 + parseInt(numberOfHours.split(":")[1]); 
        var params = {
            project_id: project.id,
            employee_id: employee.id,
            numberOfHours: numberOfHours
        }
        db.models.projectEmployee.find({project_id: params.project_id, employee_id: params.employee_id}, function (errors, projectEmployees) {
            if (projectEmployees.length){
                projectEmployees[0].numberOfHours += params.numberOfHours;
                projectEmployees[0].save();
                callback(projectEmployees);
            } else {
                db.models.projectEmployee.create(params, function (errors, projectEmployee) {
                    if (projectEmployee){
                        callback(projectEmployee);
                    } else {
                        callback(null);
                    }
                });
            }
        });
    });
}

exports.removeEmployeeFromProject = function (id, callback) {
    models(function (err, db) {
        db.models.projectEmployee.get(id, function (errors, projectEmployee) {
            if (projectEmployee && projectEmployee.id){
                projectEmployee.remove(function (error1){
                    callback(error1);
                });
            } else {
                callback(null);
            }
        });
    });
}

exports.addItemToProject = function (project, item, params, callback) {
    models(function (err, db) {
        params.project_id = project.id;
        params.item_id = item.id;

        db.models.projectItem.find({project_id: params.project_id, item_id: params.item_id}, function (errors, projectItems) {
            if (projectItems.length){
                projectItems[0].sellingPrice = params.sellingPrice;
                projectItems[0].agreedQuantity = params.agreedQuantity;
                projectItems[0].deliveredQuantity += params.deliveredQuantity;
                projectItems[0].save();
                callback(projectItems);
            } else {
                db.models.projectItem.create(params, function (errors, projectItems) {
                    if (projectItems){
                        callback(projectItems);
                    } else {
                        callback(null);
                    }
                });
            }
        });
    });
}

exports.removeItemFromProject = function (id, callback) {
    models(function (err, db) {
        db.models.projectItem.get(id, function (errors, projectItem) {
            if (projectItem && projectItem.id){
                projectItem.remove(function (error1){
                    callback(error1);
                });
            } else {
                callback(null);
            }
        });
    });
}