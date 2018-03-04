var userManager = require('../utilities/userManager');

exports.home = function (req, res) { 
    if (userManager.isAdmin(req.session)) {
        res.redirect('/dashboard');
    } else if (userManager.isUserLoggedIn(req.session)) {
        res.redirect('/dashboard');
    } else {
        res.render('login.ejs');
    }
};

exports.dashboard = function (req, res) { 
    if (userManager.isUserLoggedIn(req.session)) {
        var user = userManager.getLoggedInUser(req.session);
        res.render('dashboard/index.ejs', { user: user });
    } else {
        res.render('login.ejs');
    }
};

exports.show401 = function(req, res) {
    var user = null;
    if (userManager.isUserLoggedIn(req.session)) {
        user = userManager.getLoggedInUser(req.session);
    }
    res.render('401.ejs', { user: user });
}

exports.show404 = function(req, res) {
    var user = null;
    if (userManager.isUserLoggedIn(req.session)) {
        user = userManager.getLoggedInUser(req.session);
    }
    res.render('404.ejs', { user: user });
}