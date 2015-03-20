/** 
  * @desc populates the view with users and their info from database (one of the conceptual system VIEWS --> populates page, among other controller-related functions)
  * @required databaseServices.js 
  * @used_by search-users.html
*/ 
skillFuelApp.controller('SearchUsersCtrl', ['$rootScope','$scope', 'ReadService', 
  function ($rootScope, $scope, ReadService) {

  $scope.users = ReadService.getAllUsers(); // get 'users' Firebase array using service
  $scope.search = '';
  $scope.isNeed = false;
  $scope.isKnow = false;
      
      
  $scope.updateSearch = function () {
    if ($scope.isNeed && $scope.isKnow) {
      $scope.search = {$: $scope.searchText};  
    }
    else if ($scope.isNeed) {
      $scope.search = {knowsAllNames: $scope.searchText}; // it's inverted here. Inside this if must be knows as search (I need --> users know)
    }
    else if ($scope.isKnow) {
      $scope.search = {needsAllNames: $scope.searchText};  
    }
    else {
      $scope.search = {$: $scope.searchText};  
    }
  }

  $scope.toggleNeeds = function () {
    $scope.isNeed = $scope.isNeed ? false : true;
    $scope.search = {$: ''};  
      
      if ($scope.searchText)  {
      
       $scope.search.needsAllNames = $scope.searchText;
    $scope.updateSearch();
      }
   
    console.log("need: " + $scope.isNeed + ", know: " + $scope.isKnow);
  }

  $scope.toggleKnows = function () {
    $scope.isKnow = $scope.isKnow ? false : true;
    $scope.search = {$: ''};  
    if ($scope.searchText)  {
        
        $scope.search.knowsAllNames = $scope.searchText;

    $scope.updateSearch();
    
    }
      
    
    console.log("need: " + $scope.isNeed + ", know: " + $scope.isKnow);
  }

  // get projects part *******************************
  // $rootScope.resultObj = {};

  // projectsObj = ReadService.getProjectsByUser(id);
  // projectsObj.$loaded(
  //   function(data) {
  //     console.log(">>>>>> data from projects.");
  //     console.log(Object.keys(data));
      
  //     var i = 0;
  //     // loop gets each project ID in user profile and goes through each project info under projects
  //     angular.forEach(data, function(value, key) { // 'key' gets tagId, 'value' gets true
  //       objProj = ReadService.getProjectsById(key);
  //       objProj.$loaded( // waits for it to load (for each iteration)
  //         function(dataProj) {
  //             $rootScope.resultObj[dataProj.$id] = dataProj; //adds loaded project obj to results project
  //             console.log(">>>>>> dataProj added to be returned.");
  //             console.log(Object.keys(dataProj));
  //             console.log("$scope.resultObj: " + $rootScope.resultObj[dataProj.$id].name);
  //         },
  //         function(error) {
  //           console.error("Error:", error);
  //         }
  //       );
  //       i++;

  //     });

  //   },
  //   function(error) {
  //     console.error("Error:", error);
  //   }

  // );
  
  // console.log(Object.keys($scope.resultObj));
  // get projects part END *******************************
  
}]);