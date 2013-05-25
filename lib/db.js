var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

module.exports = function() {

    mongoose.connect('mongodb://localhost/test');
    var models = {}

    models.User = mongoose.model('User', { name: String, email: String });
    models.Tasting = mongoose.model('Tasting', { name: String, user: ObjectId });

    models.mongoose = mongoose

    return models;
};
