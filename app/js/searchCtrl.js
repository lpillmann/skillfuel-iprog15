// Search controller that we use whenever we have a search inputs
// and search results
skillFuelApp.controller('SearchCtrl', ['$scope', 'AllUsers', 'UserNeedsKnows', function ($scope,AllUsers,UserNeedsKnows) {

  $scope.users = AllUsers;

  // TODO: userNeedsKnowsObj gets undefined!! How to guarantee it will be correctly retrieved?? 
  // *** test returning Firebase obj from the service (???)

  $scope.users.$loaded()
      .then(function(usersData){ 
        console.log("$scope.users loaded.");
        angular.forEach(usersData, function(value, key) { // key gets array indexes (0,1,2,...); value gets users.userX objects 
          userNeedsKnowsObj = UserNeedsKnows(value.$id); 
          console.log(Object.keys(userNeedsKnowsObj));
          $scope.users[value.$id] = {needs: '', knows: ''};
          $scope.users[value.$id].needs = userNeedsKnowsObj.needs;
          $scope.users[value.$id].knows = userNeedsKnowsObj.knows;
          console.log("userNeedsKnowsObj: " + userNeedsKnowsObj.needs + "from user: " + value.$id);
          console.log(Object.keys(value));
        });

      })
      .catch(function(error){
      console.error("Error:", error);
      });

  $scope.$on('onNeedsKnowsObj', function() {
    //$scope.$apply(function() {
      console.log("broadcast received");
      //console.log(Object.keys(userNeedsKnowsObj));
    //});
  });

}]);