module.exports = function (orm, db) {
    var Item = db.define('item', 
    {
        title: { type: 'text', required: true },
        unitOfMeasure: { type: 'text', required: true },
        purchasePrice: { type: 'number', required: true }
    },
    {
        methods: {
            serialize: function () {
                var item = this.item;

                return {
                    id: this.id,
                    title: this.title,
                    unitOfMeasure: this.unitOfMeasure,
                    purchasePrice: this.purchasePrice
                }
            }
        }
    });
};
