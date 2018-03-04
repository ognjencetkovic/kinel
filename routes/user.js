var _ = require('lodash');
var userManager = require('../utilities/userManager');

exports.register = function (req, res) {
    message = '';
    if (req.method == "POST") {
        var post = req.body;
        var params = _.pick(req.body, 'firstName', 'lastName', 'email', 'password');
        userManager.doesUserExist(params.email, function (exists) {
            if (!exists) {
                userManager.registerUser(params, req.session, function(errors, user) {
                    if (errors){
                        message = errors;
                        res.render('register.ejs', { message: message });
                    } else {
                        res.redirect('/');
                    }
                });
            } else {
                message = params.email + " has already been registered.";
                res.render('register.ejs',{ message: message });
            }
        });
    } else {
        res.render('register');
    }
};

exports.login = function (req, res) {
    var message = '';
    var sess = req.session;
    if (req.method == "POST") {
        var post = req.body;
        userManager.loginUser(post.email, post.password, req.session, function (user) {
            if (user){
                if (userManager.isAdmin(req.session)){
                    res.redirect('/dashboard');
                } else {
                    res.redirect('/questionnaire');
                }
            } else {
                message = 'Email or password is incorrect';
                res.render('login.ejs', { message: message });
            }
        });
    } else {
        res.render('login.ejs');
    }
};

exports.logout = function (req, res) {
    userManager.logout(req.session);
    res.redirect('/');
};