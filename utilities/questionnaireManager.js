var models = require('../models/');
var helpers = require('../utilities/helpers');
var userManager = require('../utilities/userManager');

exports.createQuestionnaire = function (questionnaire, callback) {
    models(function (err, db) {
        db.models.questionnaire.create({ title: questionnaire.title }, function (errors, dbQuestionnaire) {
            if (dbQuestionnaire && dbQuestionnaire.id){
                if (!questionnaire.questions.length){
                    callback();
                    return;
                }
                var count = questionnaire.questions.length - 1;
                var done = 0;
                for (var i in questionnaire.questions){
                    if (questionnaire.questions[i].remove){
                        done++;
                    } else {
                        questionnaire.questions[i].questionnaire_id = dbQuestionnaire.id;
                        db.models.question.create(questionnaire.questions[i], function (errors2, question) {
                            if (count === done) {
                                callback();
                            }
                            done++;
                        });
                    }
                }
            }
        });
    });
}

exports.updateQuestionnaire = function (questionnaire, callback) {
    models(function (err, db) {
        db.models.questionnaire.get(questionnaire.id, function (errors, qnn) {
            qnn.title = questionnaire.title;
            questionnaire.questions.map(function(q){
                if (!q.id && !q.remove) {
                    q.questionnaire_id = questionnaire.id;
                    db.models.question.create(q, function (e, q1) {});
                }
                for (var i in qnn.questions){
                    if (q.id === qnn.questions[i].id){
                        if (q.remove) {
                            qnn.questions[i].remove(function(e){});
                        } else {
                            qnn.questions[i].type = q.type;
                            qnn.questions[i].text = q.text;
                            qnn.questions[i].options = q.options;
                            qnn.questions[i].value = q.value;
                            qnn.questions[i].order = q.order;
                        }
                    }
                }
            });
            qnn.save();
            callback();
        });
    });
}

exports.getQuestionnaire = function (id, callback) {
    models(function (err, db) {
        db.models.questionnaire.get(id, function (errors, questionnaire) {
            if (questionnaire && questionnaire.id){
                callback(questionnaire);
            } else {
                callback();
            }
        });
    });
}

exports.deleteQuestionnaire = function (id, callback) {
    models(function (err, db) {
        db.models.questionnaire.get(id, function (errors, questionnaire) {
            if (questionnaire && questionnaire.id){
                questionnaire.questions.forEach(q => {
                    q.remove(function(e){});
                });
                questionnaire.remove(function (error1){
                    callback(error1);
                });
            } else {
                callback(null);
            }
        });
    });
}

exports.getQuestionnaireList = function (callback) {
    models(function (err, db) {
        db.models.questionnaire.find().all(function (errors, questionnaires) {
            if (questionnaires){
                callback(questionnaires);
            } else {
                callback(null);
            }
        });
    });
}

exports.saveAnswers  = function (userId, questionnaireId, answers, callback) {
    models(function (err, db) {
        var dbAnswers = [];
        var count = Object.keys(answers).length - 1;
        var done = 0;
        for (var i in answers) {
            var tmp = {
                value: answers[i],
                question_id: i,
                user_id: userId
            };
            db.models.answer.create(tmp, function (errors, response) {
                if (count === done){
                    userManager.addQuestionnaire(userId, questionnaireId, callback);
                }
                done++;
            });
        }
    });
}

exports.getUserQuestionnaireList = function (userId, callback) {
    userManager.getUsersQuestionnaires(userId, function(err, userQuestionnaires){
        models(function (err, db) {
            db.models.questionnaire.find().all(function (errors, questionnaires) {
                questionnaires.map(function(qnn){
                    for (var i in userQuestionnaires){
                        if (userQuestionnaires[i].id === qnn.id){
                            qnn.completed = true;
                        }
                    }
                    return qnn;
                });
                callback(questionnaires);
            });
        });
    });
}