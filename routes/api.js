var _ = require('lodash');
var beerList = require('../mockdata/unique_beers.json');
var yelp = require('yelp')

module.exports = function(app) {

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
}
