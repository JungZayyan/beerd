var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

module.exports = function(url) {

    mongoose.connect(url);
    console.log('Connected to MongoDB database.');
    var models = {}

    models.User = mongoose.model('User', { name: String, email: String });
    models.Tasting = mongoose.model('Tasting', { beer: Object,
        user: ObjectId, liked: Boolean, notes: String, location: Object,
        coords: { latitude: Number, longitude: Number } });

    models.mongoose = mongoose

    return models;
};
