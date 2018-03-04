var userManager = require('../utilities/userManager');
var employeeManager = require('../utilities/employeeManager');

exports.getList = function (req, res) { 
    if (userManager.isUserLoggedIn(req.session)) {
        var user = userManager.getLoggedInUser(req.session);
        employeeManager.getEmployees(function(employees){
            res.render('employee/index.ejs', { user: user, employees: employees });
        });
    } else {
        res.redirect('/401');
    }
};

exports.get = function (req, res) {
    res.render('employee/employee.ejs', {  });
};

exports.create = function (req, res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    employeeManager.createEmployee(req.body, function() {
        res.redirect('/employee');
    });
};