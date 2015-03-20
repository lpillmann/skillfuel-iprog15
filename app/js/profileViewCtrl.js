/** 
  * @desc populates the profile view with user info from database (one of the conceptual system VIEWS --> populates page, among other controller-related functions)
  * @required databaseServices.js 
  * @used_by profile.html
*/ 
skillFuelApp.controller("ProfileViewCtrl", ["$rootScope", "$scope", "ReadService", "$routeParams",
  function($rootScope, $scope, ReadService, $routeParams) {
     
    var id = $routeParams.profileId.split(':')[1]; // remove ':' that comes with parameter

    $scope.user = ReadService.getUserInfo(id);

    $rootScope.resultObj = {};

    projectsObj = ReadService.getProjectsByUser(id);
    projectsObj.$loaded(
      function(data) {
        console.log(">>>>>> data from projects.");
        console.log(Object.keys(data));
        
        var i = 0;
        // loop gets each project ID in user profile and goes through each project info under projects
        angular.forEach(data, function(value, key) { // 'key' gets tagId, 'value' gets true
          objProj = ReadService.getProjectsById(key);
          objProj.$loaded( // waits for it to load (for each iteration)
            function(dataProj) {
                $rootScope.resultObj[dataProj.$id] = dataProj; //adds loaded project obj to results project
                console.log(">>>>>> dataProj added to be returned.");
                console.log(Object.keys(dataProj));
                console.log("$scope.resultObj: " + $rootScope.resultObj[dataProj.$id].name);
            },
            function(error) {
              console.error("Error:", error);
            }
          );
          i++;

        });

      },
      function(error) {
        console.error("Error:", error);
      }

    );
    
    console.log(Object.keys($scope.resultObj));
}]);

