var userManager = require('../utilities/userManager');
var projectsManager = require('../utilities/projectsManager');
var employeeManager = require('../utilities/employeeManager');
var itemManager = require('../utilities/itemManager');

exports.getList = function (req, res) { 
    if (userManager.isUserLoggedIn(req.session)) {
        var user = userManager.getLoggedInUser(req.session);
        projectsManager.getProjects(function(projects){
            res.render('project/index.ejs', { user: user, projects: projects });
        });
    } else {
        res.redirect('/401');
    }
};

exports.new = function (req, res) {
    if (userManager.isUserLoggedIn(req.session)) {
        var user = userManager.getLoggedInUser(req.session);
        projectsManager.getProjects(function(projects){
            res.render('project/new-project.ejs', { user: user });
        });
    } else {
        res.redirect('/401');
    }
};

exports.get = function (req, res) {
    if (userManager.isUserLoggedIn(req.session)) {
        var user = userManager.getLoggedInUser(req.session);
        projectsManager.getProject(req.params.id, function (project) {
            if (project) {
                var allEmployees = [];
                var allItems = [];
                var projectEmployees = [];
                var projectItems = [];
                var areEmployeeSorted = false;
                var areItemsSorted = false;
                employeeManager.getEmployees(function (employees) {
                    allEmployees = employees;
                    for (var i in project.projectEmployees) {
                        for (var j in employees) {
                            if (employees[j].id == project.projectEmployees[i].employee_id) {
                                var employee = {
                                    id: project.projectEmployees[i].id,
                                    firstName: employees[j].firstName,
                                    lastName: employees[j].firstName,
                                    numberOfHours: Math.floor(project.projectEmployees[i].numberOfHours / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                                                     + ":" + (project.projectEmployees[i].numberOfHours % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
                                }
                                projectEmployees.push(employee);
                                break;
                            }
                        }
                    }
                    areEmployeeSorted = true;
                    if (areEmployeeSorted && areItemsSorted){
                        res.render('project/project.ejs', { user: user, project: project, employees: allEmployees, projectEmployees: projectEmployees, items: allItems, projectItems: projectItems });
                    }
                });
                itemManager.getItems(function (items) {
                    allItems = items;
                    for (var i in project.projectItems) {
                        for (var j in items) {
                            if (items[j].id == project.projectItems[i].item_id) {
                                var item = {
                                    id: project.projectItems[i].id,
                                    title: items[j].title,
                                    unitOfMeasure: items[j].unitOfMeasure,
                                    purchasePrice: items[j].purchasePrice,
                                    sellingPrice: project.projectItems[i].sellingPrice,
                                    agreedQuantity: project.projectItems[i].agreedQuantity,
                                    deliveredQuantity: project.projectItems[i].deliveredQuantity
                                }
                                projectItems.push(item);
                                break;
                            }
                        }
                    }
                    areItemsSorted = true;
                    if (areEmployeeSorted && areItemsSorted){
                        res.render('project/project.ejs', { user: user, project: project, employees: allEmployees, projectEmployees: projectEmployees, items: allItems, projectItems: projectItems });
                    }
                });
            } else {
                res.redirect('/404');
            }
        }); 
    } else {
        res.redirect('/401');
    }
};

exports.create = function (req, res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    projectsManager.createProject(req.body, function() {
        res.redirect('/projects');
    });
};

exports.update = function (req, res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    projectsManager.updateProject(req.params.id, req.body, function() {
        res.redirect('/project/' + req.params.id);
    });
};

exports.addEmployeeToProject = function (req, res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    projectsManager.getProject(req.params.id, function (project) {
        if (project) {
            employeeManager.getEmployee(req.body.employee, function (employee){
                projectsManager.addEmployeeToProject(project, employee, req.body.numberOfHours, function () {
                    res.redirect('/project/' + project.id);
                });
            });
        } else {
            res.redirect('/404');
        }
    }); 
}

exports.removeEmployeeFromProject = function (req, res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    projectsManager.removeEmployeeFromProject(req.params.projectEmployeeId, function () {
        res.sendStatus(200);
    }); 
}

exports.addItemToProject = function (req, res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    projectsManager.getProject(req.params.id, function (project) {
        if (project) {
            itemManager.getItem(req.body.item, function (item){
                projectsManager.addItemToProject(project, item, req.body, function () {
                    res.redirect('/project/' + project.id);
                });
            });
        } else {
            res.redirect('/404');
        }
    }); 
}

exports.removeItemFromProject = function (req, res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    projectsManager.removeItemFromProject(req.params.projectItemId, function () {
        res.sendStatus(200);
    }); 
}