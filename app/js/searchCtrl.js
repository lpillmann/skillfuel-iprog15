// Search controller that we use whenever we have a search inputs
// and search results
skillFuelApp.controller('SearchCtrl', ['$scope', 'SkillFuel', function ($scope,SkillFuel) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

  $scope.getUsers = function () {
    return SkillFuel.getUsers();
  }

  $scope.users = $scope.getUsers();





}]);