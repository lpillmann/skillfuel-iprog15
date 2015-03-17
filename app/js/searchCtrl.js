// Search controller that we use whenever we have a search inputs
// and search results
skillFuelApp.controller('SearchCtrl', ['$scope', 'SkillFuel', '$rootScope', function ($scope,SkillFuel,$rootScope) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.
  $scope.skillId = '';
  $scope.skillType = '';
  $scope.users = [];
    
  $scope.getUsers = function () {
    return SkillFuel.getUsers();
  }

  $scope.usersByTag = []; 	// dummy temporary variable for users to be searched in the new way (with Tags)
  							// QUESTION: Do we include the skills in Firabase.users.userX ? This would result in 
  							// duplicated (denormalized) data, but that's fine

  // Experimenting with Tag-based database: how to get all users with that have a tag Id as need or know
  $scope.getUsersBySkillId = function (skillType, skill) {
  	$scope.usersByTag = SkillFuel.getUsersBySkillId(skillType, skill);
  }

  $scope.users = $scope.getUsers();
  $scope.test = 'hey there!';

  //$scope.users = $scope.getUsersBySkillId($scope.skillType, $scope.skillId);





}]);