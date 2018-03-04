module.exports = function (orm, db) {
    var Question = db.define('question', 
    {
        type: { type: 'number', required: true },
        text: { type: 'text' },
        options: { type: 'text' },
        value: { type: 'text' },
        order: { type: 'number', required: true}
    },
    {
        methods: {
            serialize: function () {
                var answers = this.answers;

                if (answers) {
                    answers = answers.map(function (a) { return a.serialize(); });
                } else {
                    answers = [];
                }

                return {
                    id: this.id,
                    type: this.type,
                    text: this.text,
                    options: this.options,
                    value: this.value,
                    order: this.order,
                    answers: this.answers
                }
            }
        }
    });
    Question.hasOne('questionnaire', db.models.questionnaire, { required: true, reverse: 'questions', autoFetch: true });
};
