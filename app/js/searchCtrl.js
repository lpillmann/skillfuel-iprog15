// Search controller that we use whenever we have a search inputs
// and search results
<<<<<<< HEAD
skillFuelApp.controller('SearchCtrl', function ($scope,SkillFuel) {
=======
skillFuelApp.controller('SearchCtrl', ['$scope', '$modal', '$log', 'SkillFuel', function ($scope,$modal,$log,SkillFuel) {
>>>>>>> Firebase-as-a-Angular-service

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

<<<<<<< HEAD
});
=======
  $scope.getUsers = function () {
    return SkillFuel.getUsers();
  }

  $scope.users = $scope.getUsers();





}]);
>>>>>>> Firebase-as-a-Angular-service
