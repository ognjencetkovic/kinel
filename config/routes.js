var index = require('../routes');
var user = require('../routes/user');
var projects = require('../routes/projects');
var employee = require('../routes/employee');
var item = require('../routes/item');

module.exports = function (app) {
    
    app.get('/', index.home);
    app.get('/dashboard', index.dashboard);

    app.get('/register', user.register);
    app.post('/register', user.register);
    app.get('/login', user.login);
    app.post('/login', user.login);
    app.get('/logout', user.logout);
    
    app.get('/projects', projects.getList);
    app.get('/project', projects.new);
    app.post('/project', projects.create);
    app.get('/project/:id', projects.get);
    app.post('/project/:id', projects.update);

    
    app.get('/employees', employee.getList);
    app.get('/employee', employee.get);
    app.post('/employee', employee.create);
    
    app.get('/items', item.getList);
    app.get('/item', item.get);
    app.post('/item', item.create);
    
    app.post('/project/employee/:id', projects.addEmployeeToProject);
    app.delete('/project/employee/:id/:projectEmployeeId', projects.removeEmployeeFromProject);

    
    app.post('/project/item/:id', projects.addItemToProject);
    app.delete('/project/item/:id/:projectItemId', projects.removeItemFromProject);
    
    // app.get('/questionnaire', questionnaire.getList);
    // app.get('/questionnaire/:id', questionnaire.get);
    // app.post('/questionnaire/:id', questionnaire.create);
    
    // app.get('/dashboard', dashboard.getList);
    // app.get('/dashboard/questionnaire', dashboard.get);
    // app.post('/dashboard/questionnaire', dashboard.create);
    // app.get('/dashboard/questionnaire/:id', dashboard.get);
    // app.post('/dashboard/questionnaire/:id', dashboard.create);
    // app.delete('/dashboard/questionnaire/:id', dashboard.delete);
    
    app.get('/401', index.show401);
    app.get('/404', index.show404);
    app.get('*', index.show404);
    
};
