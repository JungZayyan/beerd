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

function TastingController($scope, $http, $q, limitToFilter, debounce) {
    $scope.url = '/api/tasting';
    var beers = []

    var beers = function(name) {
        if (name === null || name.length < 3)
            return [];
        return $http.get('/api/beers?filter=' + name).then(function(responses) {
            beers = limitToFilter(responses.data, 15);
            return beers;
        });
    };
    $scope.beers = debounce(beers, 300, false);
    $scope.liked = false
    $scope.location = '';
    $scope.locations = {};
    $scope.coords = {latitude:0, longitude:0}
    console.log('getting position...');
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        console.log('getting the place...');
        $scope.coords.latitude = position.coords.latitude;
        $scope.coords.longitude = position.coords.longitude;
        $http.get('/api/location?ll=' + position.coords.latitude
                  + ',' + position.coords.longitude).success(function(data) {
            $scope.locations = {};
            _.forEach(data.businesses, function(business) {
                $scope.locations[business.name] = business;
            });
            $scope.location = data.businesses[0];
            console.log($scope.locations);
        });
    }, function() {
        // TODO: handle failure
        $scope.locations = []
        $scope.locationName = '<no location found>';
    });

    $scope.sendForm = function() {
        var beer = _.find(beers, {name: $scope.beer});
        if (beer === null) return;
        $http.post($scope.url, {
            beer: beer,
            location: $scope.location,
            coords: $scope.coords,
            notes: $scope.notes,
            liked: $scope.liked
        }).success(function(data, status) {
            window.location.href = '/history';
        });

    };

}
