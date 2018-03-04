module.exports = function (orm, db) {
    var Answer = db.define('answer', 
    {
        value: { type: 'text' }
    },
    {
        methods: {
            serialize: function () {
                return {
                    id: this.id,
                    value: this.value
                }
            }
        }
    });
    Answer.hasOne('question', db.models.question, { required: true, reverse: 'answers', autoFetch: true });
    Answer.hasOne('user', db.models.user, { required: true, reverse: 'answers' });
};
