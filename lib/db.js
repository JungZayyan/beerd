var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

module.exports = function(url) {

    mongoose.connect(url);
    console.log('Connected to MongoDB database.');
    var models = {};

    models.User = mongoose.model('User', { name: String, email: String });

    models.Tasting = mongoose.model('Tasting', {
        beer: { type: Mixed, required: true },
        created: { type: Date, default: Date.now, required: true },
        user: ObjectId,
        liked: Boolean,
        notes: String,
        location: { type: Mixed, required: true },
        coords: { type: Mixed, required: true } });

    models.Splash = mongoose.model('Splash', {
        email: { type: String, required: true, unique: true }
    });

    models.mongoose = mongoose;

    return models;
};
