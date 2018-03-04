var userManager = require('../utilities/userManager');
var questionnaireManager = require('../utilities/questionnaireManager');

exports.getList = function (req, res) { 
    if (userManager.isUserLoggedIn(req.session)) {
        var user = userManager.getLoggedInUser(req.session);
        questionnaireManager.getUserQuestionnaireList(req.session.userId, function(questionnaires){
            res.render('index.ejs', { user: user, questionnaires: questionnaires });
        });
    } else {
        res.redirect('/401');
    }
};

exports.get = function (req, res) {
    if (userManager.isUserLoggedIn(req.session)){
        if (req.params.id) {
            var user = userManager.getLoggedInUser(req.session);
            questionnaireManager.getQuestionnaire(req.params.id, function (questionnaire) {
                if (questionnaire) {
                    res.render('questionnaire.ejs', { user: user, questionnaire: questionnaire.serialize(), success: false });
                } else {
                    res.redirect('/404');
                }
            });
        } else {
            res.redirect('/404');
        }
    } else {
        res.redirect('/401');
    }
};

exports.create = function (req, res) {
    if (userManager.isUserLoggedIn(req.session)){
        var user = userManager.getLoggedInUser(req.session);
        questionnaireManager.saveAnswers(req.session.userId, req.params.id, req.body, function(err, answers) {
            res.render('questionnaire.ejs', { user: user, success: true });
        });
    } else {
        res.redirect('/401');
    }
};