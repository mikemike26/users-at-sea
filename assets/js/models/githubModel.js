angular.module('appModule').factory('GithubModel', ['$http', '$q', function($http, $q){
  var GithubModel = {};

  //find all github repos for a user
  GithubModel.findRepos = function(user) {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: 'https://api.github.com/users/'+user+'/repos',
      dataType: 'json',
      //removes csrf token from github api request because they don't allow them
      transformRequest: function(data, getHeaders){
        var headers = getHeaders();
        delete headers["X-CSRF-Token"];
        return data;
      },
      contentType: 'application/json'
    }).success(function (data, status, headers, config) {
      console.log(data);
      deferred.resolve(angular.fromJson(data));
    }).error(function (data, status, headers, config) {
      deferred.reject(data);
    });
    return deferred.promise;
  };
  return GithubModel;
}]);
