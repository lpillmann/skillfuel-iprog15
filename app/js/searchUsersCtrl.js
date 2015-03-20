/** 
  * @desc populates the view with users and their info from database (one of the conceptual system VIEWS --> populates page, among other controller-related functions)
  * @required databaseServices.js 
  * @used_by search-users.html
*/ 
skillFuelApp.controller('SearchUsersCtrl', ['$scope', 'ReadService', 
  function ($scope, ReadService) {

  $scope.users = ReadService.getAllUsers(); // get 'users' Firebase array using service
  $scope.search = '';
  $scope.isNeed = false;
  $scope.isKnow = false;
      
      
  $scope.updateSearch = function () {
    if ($scope.isNeed && $scope.isKnow) {
      $scope.search = {$: $scope.searchText};  
    }
    else if ($scope.isNeed) {
      $scope.search = {knows: $scope.searchText};    
    }
    else if ($scope.isKnow) {
      $scope.search = {needs: $scope.searchText};  
    }
    else {
      $scope.search = {$: $scope.searchText};  
    }
  }

  $scope.toggleNeeds = function () {
    $scope.isNeed = $scope.isNeed ? false : true;
    $scope.search = {$: ''};  
      
      if ($scope.searchText)  {
      
       $scope.search.needs = $scope.searchText;
    $scope.updateSearch();
      }
   
    console.log("need: " + $scope.isNeed + ", know: " + $scope.isKnow);
  }

  $scope.toggleKnows = function () {
    $scope.isKnow = $scope.isKnow ? false : true;
    $scope.search = {$: ''};  
    if ($scope.searchText)  {
        
        $scope.search.knows = $scope.searchText;

    $scope.updateSearch();
    
    }
      
    
    console.log("need: " + $scope.isNeed + ", know: " + $scope.isKnow);
  }
  
}]);