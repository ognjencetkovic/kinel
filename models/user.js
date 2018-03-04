module.exports = function (orm, db) {
    var User = db.define('user', 
    {
        firstName: { type: 'text', required: true },
        lastName: { type: 'text', required: true },
        email: { type: 'text', required: true, unique: true },
        password: { type: 'text', required: true },
        salt: { type: 'text', required: true },
        admin: { type: 'boolean', defaultValue: false }
    },
    {
        validations: {
            email: orm.enforce.ranges.length(1, 1024)
        },
        methods: {
            serialize: function () {
                return {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email
                }
            }
        }
    });
    User.hasMany('questionnaires', db.models.questionnaire, {}, { reverse: 'users', key: true })
};
