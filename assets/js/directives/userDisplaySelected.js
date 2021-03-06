angular.module('appModule').directive('userDisplaySelected',['UserModel', 'GithubModel', '$state', '$stateParams',
  function(UserModel, GithubModel, $state, $stateParams) {
  return {
    restrict: 'A',
    templateUrl: 'templates/directives/userDisplaySelected.html',
    link: function (scope, element, attrs) {
      scope.user = {};
      scope.gitNotFound = false;
      UserModel.find($stateParams.id).then(function(data) {
        scope.user = data;
        GithubModel.findRepos(data.gitHubId).then(function(data) {
          scope.repos = data;
        }, function(err) {
          scope.gitNotFound = true;
        });
      });
      scope.editUser = function() {
        $state.transitionTo('main.edit', {id: scope.user.id});
      };
    }
  }
}]);
