module.exports = function (orm, db) {
    var Questionnaire = db.define('questionnaire', 
    {
        title: { type: 'text', required: true },
    },
    {
        methods: {
            serialize: function () {
                var questions = this.questions;

                if (questions) {
                    questions.sort(function (a, b) {
                        return a.order - b.order;
                    });
                    questions = questions.map(function (q) { return q.serialize(); });
                } else {
                    questions = [];
                }

                return {
                    id: this.id,
                    title: this.title,
                    questions: questions
                }
            }
        }
    });
};
