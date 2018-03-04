module.exports = function (orm, db) {
    var ProjectEmployee = db.define('projectEmployee', 
    {
        numberOfHours: { type: 'number', required: true }
    },
    {
        methods: {
            serialize: function () {
                var projectEmployee = this.projectEmployee;

                return {
                    id: this.id,
                    numberOfHours: this.numberOfHours
                }
            }
        }
    });
    ProjectEmployee.hasOne('project', db.models.project, { required: true, reverse: 'projectEmployees', autoFetch: true });
    ProjectEmployee.hasOne('employee', db.models.employee, { required: true, reverse: 'projectEmployees', autoFetch: true });
};
