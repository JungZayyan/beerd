var _ = require('lodash');
var beerList = require('../mockdata/unique_beers.json');
var yelp = require('yelp');

var check = require('validator').check,
    sanitize = require('validator').sanitize;

module.exports = function(app, models) {

    var yelpClient = yelp.createClient({
        consumer_key: process.env.YELP_KEY,
        consumer_secret: process.env.YELP_SECRET,
        token: process.env.YELP_TOKEN,
        token_secret: process.env.YELP_TOKEN_SECRET
    });

    app.get('/api/beers', function(request, response){
        var filter = new RegExp(request.param('filter'), 'i');
        var orderFilter = new RegExp('^' + request.param('filter'), 'i');
        var results = _.filter(beerList, function(beer) {
            return filter.test(beer.name);
        });
        results = _.sortBy(results, function(beer) {
            return !orderFilter.test(beer.name);
        });
        response.json(results);
    });

    app.get('/api/location', function(request, response, next) {
        yelpClient.search({term: 'pub', ll: request.param('ll')}, function(error, data) {
            if (error)
                next(error);
            response.send(data);
        });

    });

    app.post('/api/tasting', function(req, res) {
        var tasting = new models.Tasting({
            beer: req.param('beer'),
            location: req.param('location'),
            coords: req.param('coords'),
            notes: req.param('notes'),
            liked: req.param('liked')
        });
        if (typeof tasting.beer === 'undefined'
            || typeof tasting.location === 'undefined'
            || typeof tasting.coords === 'undefined')
            return res.send(400);
        tasting.save(function(error) {
            if (error)
                return res.send(400);
            res.send(200);
        });
    });


    app.post('/api/splash', function(req, res) {
        var email = req.param('email');
        try {
            check(email).len(6, 64).isEmail();
        } catch (ex) {
            return res.send(400);
        }
        var splash = new models.Splash({
            email: email
        });
        splash.save(function(error) {
            if (error)
                return res.send(400);
            res.send(200);
        });

    });
}
