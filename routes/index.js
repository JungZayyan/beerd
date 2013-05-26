_ = require('lodash');
/*
 * GET home page.
 */

module.exports = function(app, models) {

    var livereload = false;
    app.configure('development', function(){
        livereload = true
    });

    app.get('/', function(req, res) {
        res.render('index', { title: 'Beerd', livereload: livereload });
    });

    app.get('/sign-in', function(req, res) {
        res.render('sign-in', { title: 'Sign in', livereload: livereload });
    });

    app.get('/home', function(req, res) {
        res.render('home', { title: 'Home', livereload: livereload });
    });

    app.get('/map', function(req, res) {
        res.render('map', { title: 'Map', livereload: livereload });
    });

    app.get('/diary', function(req, res) {
        res.render('diary', { title: 'Diary', livereload: livereload });
    });

    app.get('/history', function(req, res){
        models.Tasting
            .find()
            .sort({ created: -1 })
            .exec(function(err, tastings) {
                tastings = _.map(tastings, function(tasting) {
                    tasting = tasting.toObject();
                    tasting.imageName = 'dead-guy';
                    if (_.contains([15967, 1862], tasting.beer.beerId))
                        tasting.imageName = String(tasting.beer.beerId);
                    return tasting;
                });
                res.render('history', {
                    title: 'History',
                    tastings: tastings,
                    livereload: livereload
                });
        });
    });

    app.get('/trending', function(req, res){
        res.render('trending', { title: 'Trending', livereload: livereload });
    });
};

