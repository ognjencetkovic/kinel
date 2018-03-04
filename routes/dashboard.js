var userManager = require('../utilities/userManager');
var questionnaireManager = require('../utilities/questionnaireManager');

exports.getList = function (req, res) {
    if (userManager.isAdmin(req.session)) {
        var user = userManager.getLoggedInUser(req.session);
        questionnaireManager.getQuestionnaireList(function (questionnaires) {
            res.render('dashboard/index.ejs', { user: user, questionnaires: questionnaires });
        });
    } else {
        res.redirect('/401');
    }
};

exports.create = function (req, res) {
    if (userManager.isAdmin(req.session)) {
        if (req.body.questionnaire && req.body.questionnaire.id) {
            questionnaireManager.updateQuestionnaire(req.body.questionnaire, function (err, questionnaire) {
                res.sendStatus(200);
            });
        } else {
            var post = req.body;
            questionnaireManager.createQuestionnaire(req.body.questionnaire, function (err, questionnaire) {
                res.sendStatus(200);
            });
        }
    } else {
        res.redirect('/401');
    }
};

exports.get = function (req, res) {
    if (userManager.isAdmin(req.session)) {
        var user = userManager.getLoggedInUser(req.session);
        if (req.params.id) {
            questionnaireManager.getQuestionnaire(req.params.id, function (questionnaire) {
                if (questionnaire) {
                    res.render('dashboard/questionnaire.ejs', { user: user, questionnaire: questionnaire.serialize() });
                } else {
                    res.redirect('/404');
                }
            });
        } else {
            res.render('dashboard/questionnaire.ejs', { user: user, questionnaire: null });
        }
    } else {
        res.redirect('/401');
    }
};

exports.delete = function (req, res) {
    if (userManager.isAdmin(req.session)) {
        if (req.params.id) {
            questionnaireManager.deleteQuestionnaire(req.params.id, function () {
                res.sendStatus(200);
            });
        } else {
            res.sendStatus(404);
        }
    } else {
        res.redirect('/401');
    }
};