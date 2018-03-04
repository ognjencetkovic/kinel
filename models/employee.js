module.exports = function (orm, db) {
    var Employee = db.define('employee', 
    {
        firstName: { type: 'text', required: true },
        lastName: { type: 'text', required: true }
    },
    {
        methods: {
            serialize: function () {
                var employee = this.employee;

                return {
                    id: this.id,
                    firstName: this.firstName,
                    lastName: this.lastName
                }
            }
        }
    });
};
