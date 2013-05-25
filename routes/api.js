var _ = require('lodash');
var beerList = _.unique(require('../mockdata/beers.json'), function(beer) {
    return beer.beerId;
});

exports.beers = function(request, response){
    var filter = new RegExp(request.param('filter'), 'i');
    var orderFilter = new RegExp('^' + request.param('filter'), 'i');
    var results = _.filter(beerList, function(beer) {
        return filter.test(beer.name);
    });
    results = _.sortBy(results, function(beer) {
        return !orderFilter.test(beer.name);
    });
    response.send(results);
};
