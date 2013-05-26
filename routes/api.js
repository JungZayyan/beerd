var _ = require('lodash');
var beerList = require('../mockdata/unique_beers.json');

exports.beers = function(request, response){
    var filter = new RegExp(request.param('filter'), 'i');
    var orderFilter = new RegExp('^' + request.param('filter'), 'i');
    var results = _.filter(beerList, function(beer) {
        return filter.test(beer.name);
    });
    results = _.sortBy(results, function(beer) {
        return !orderFilter.test(beer.name);
    });
    response.json(results);
};
