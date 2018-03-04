var userManager = require('../utilities/userManager');
var itemManager = require('../utilities/itemManager');

exports.getList = function (req, res) { 
    if (userManager.isUserLoggedIn(req.session)) {
        var user = userManager.getLoggedInUser(req.session);
        itemManager.getItems(function(items){
            res.render('item/index.ejs', { user: user, items: items });
        });
    } else {
        res.redirect('/401');
    }
};

exports.get = function (req, res) {
    res.render('item/item.ejs', {  });
};

exports.create = function (req, res) {
    req.body = JSON.parse(JSON.stringify(req.body));
    itemManager.createItem(req.body, function() {
        res.redirect('/items');
    });
};