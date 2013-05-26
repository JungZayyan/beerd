var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

module.exports = function(url) {

    mongoose.connect(url);
    var models = {}

    models.User = mongoose.model('User', { name: String, email: String });
    models.Tasting = mongoose.model('Tasting', { beerName: String,
        user: ObjectId, liked: Boolean, notes: String, location: String,
        coords: String });

    models.mongoose = mongoose

    return models;
};
