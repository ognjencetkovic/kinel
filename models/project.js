module.exports = function (orm, db) {
    var Project = db.define('project', 
    {
        number: { type: 'text', required: true },
        title: { type: 'text', required: true }
    },
    {
        methods: {
            serialize: function () {
                var project = this.project;

                return {
                    id: this.id,
                    number: this.number,
                    title: this.title
                }
            }
        }
    });
};
