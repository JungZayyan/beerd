var app = angular.module('beerd', ['ui.bootstrap']);

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
app.factory('debounce', function($timeout, $q) {
  return function(func, wait, immediate) {
    var timeout;
    var deferred = $q.defer();
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if(!immediate) {
          deferred.resolve(func.apply(context, args));
          deferred = $q.defer();
        }
      };
      var callNow = immediate && !timeout;
      if ( timeout ) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(later, wait);
      if (callNow) {
        deferred.resolve(func.apply(context,args));
        deferred = $q.defer();
      }
      return deferred.promise;
    };
  };
});

function BeerNameController($scope, $http, limitToFilter, debounce) {
    var beers = function(name) {
        return $http.get('/api/beers?filter=' + name).then(function(responses) {
            return limitToFilter(responses.data, 15);
        });
    };
    $scope.beers = debounce(beers, 300, false);
    $scope.beerTitle = function(beer) {
        if (typeof beer === 'undefined' || beer === null) {
            return null;
        }
        return beer.name;
    };
}
