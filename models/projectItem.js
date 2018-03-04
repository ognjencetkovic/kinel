module.exports = function (orm, db) {
    var ProjectItem = db.define('projectItem', 
    {
        sellingPrice: { type: 'number', required: true },
        agreedQuantity: { type: 'number', required: true },
        deliveredQuantity: { type: 'number', required: true }
    },
    {
        methods: {
            serialize: function () {
                var projectEmployee = this.projectEmployee;

                return {
                    id: this.id,
                    sellingPrice: this.sellingPrice,
                    agreedQuantity: this.agreedQuantity,
                    deliveredQuantity: this.deliveredQuantity
                }
            }
        }
    });
    ProjectItem.hasOne('project', db.models.project, { required: true, reverse: 'projectItems', autoFetch: true });
    ProjectItem.hasOne('item', db.models.item, { required: true, reverse: 'projectItems', autoFetch: true });
};
