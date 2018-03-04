var models = require('../models/');
var passwordHash = require('../utilities/passwordHash');
var helpers = require('../utilities/helpers');

exports.registerUser = function (params, session, callback) {
    models(function (err, db) {
        var passwordData = passwordHash.saltHashPassword(params.password);
        params.password = passwordData.passwordHash;
        params.salt = passwordData.salt;
        db.models.user.create(params, function (errors, user) {
            if (!errors) {
                session.userId = user.id;
                session.admin = user.admin;
                session.user = user.serialize();
                callback(null, user);
            } else {
                callback(helpers.formatErrors(errors), null);
            }
        });
    });
}

exports.loginUser = function (email, password, session, callback) {
    models(function (err, db) {
        db.models.user.find({ email: email}, function (err, users) {
            var user = null;
            if (users && users.length) {
                user = users[0];
                var passwordValid = passwordHash.validatePassword(password, user.salt, user.password);
                if (passwordValid) {
                    session.userId = user.id;
                    session.admin = user.admin;
                    session.user = user.serialize();
                    callback(user);
                } else {
                    callback();
                }
            } else {
                callback();
            }
        });        
    });
};

exports.doesUserExist = function (email, callback) {
    models(function (err, db) {
        db.models.user.find({ email: email }, function (err, users) {
            callback(users.length);
        });
    });
}

exports.isUserLoggedIn = function (session) {
    if (session && session.userId) {
        return true;
    }
};

exports.isAdmin = function (session) {
    if (session && session.admin) {
        return true;
    }
};

exports.getLoggedInUser = function (session) {
    if (session && session.user){
        return session.user;
    }
};

exports.getUsersQuestionnaires = function (userId, callback) {
    models(function (err, db) {
        db.models.user.get(userId, function (err, user) {
            user.getQuestionnaires(function(err1, questionnaires){
                callback(err1, questionnaires);
            });
        });
    });
};

exports.logout = function (session, callback) {
    session.destroy();
};

exports.addQuestionnaire = function (userId, questionnaireId, callback) {
    models(function (err, db) {
        db.models.user.get(userId, function(err, user){
            db.models.questionnaire.get(questionnaireId, function(err2, questionnaire){
                user.addQuestionnaires(questionnaire, function(){
                    callback();
                })
            });
        });
    });
}
