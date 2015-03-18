/** 
  * @desc populates the view with users and their info from database (one of the conceptual system VIEWS --> populates page, among other controller-related functions)
  * @required databaseServices.js 
  * @used_by search-users.html
*/ 
skillFuelApp.controller('SearchUsersCtrl', ['$scope', 'ReadService', 
  function ($scope, ReadService) {

  $scope.users = ReadService.AllUsers(); // get 'users' Firebase array using service

  // TODO: integrate with search/filter mechanism! Now, the search only looks into $scope.users content

  // Gets data to populate 'Needs' and 'Knows' profiles. It is working, but it's not binded in real-time, though. Do we need it to be?
  // It has been implemented here due to complications with callbacks when calling from the model. Possibly change this in the future
  $scope.users.$loaded()
      .then(function(usersData){  // once loaded, usersData will hold the object
        console.log("$scope.users loaded.");
        
        // create auxiliary object to hold the needs and knows, once it's not possible/convenient to 
        // edit $scope.users directly (it's a Firebase array)
        $scope.usersNeedsKnows = {}; 

        // iterate through the users. 'key' gets Firebase array indexes (0,1,2,...); 'value' gets users.userX objects 
        angular.forEach(usersData, function(value, key) { 
          userTagsContent = ReadService.UserTagsContent(value.$id); // uses 'join' service to get tags (with content) from a user
          
          userTagsContent.$loaded()
              .then(function(userTagsData){ 
								//console.log("$scope.userTagsContent loaded."); 
                //console.log(Object.keys(userTagsData));

                $scope.usersNeedsKnows[value.$id] = {needs: {},knows: {}}; // create user field in the auxiliary object with needs/knows keys
                
                // iterate through user tags content. '_key' receives tag ids (tag1, tag2, ...) ; '_value' receives each tag's content
                angular.forEach(userTagsData, function(_value, _key) {
                  //debug
									//console.log(Object.keys(_value));
                      if(_value.isNeed === true) {
                        // Inserts values to the aux. object. 'value.$id' has user ID, '_value.name' has tag name
                        $scope.usersNeedsKnows[value.$id].needs[_value.name] = true; 
                        //console.log(Object.keys($scope.usersNeedsKnows[value.$id].needs));
                      }
                      else if (_value.isNeed === false) {
                        $scope.usersNeedsKnows[value.$id].knows[_value.name] = true; 
                        //console.log(Object.keys($scope.usersNeedsKnows[value.$id].knows));
                      }
                      //console.log(Object.keys($scope.usersNeedsKnows[value.$id]));
                })
              })
              .catch(function(error){
                console.error("Error:", error);
              });
        });

      })
      .catch(function(error){
        console.error("Error:", error);
      });
}]);

// skillFuelApp.filter('userNeedsKnowsFilter', function() {
//   return function( items, filter, skills) {
//     var filtered = [];
//     var i = 0;
//     angular.forEach(items, function(item) {
//       if ((skills.needs[i].indexOf(filter) > -1) || (skills.needs[i].indexOf(filter) > -1)) { // filters (includes) if it's need or know
//         filtered.push(item);
//         console.log("users search pushed item: " + item);
//       } 
//       i++; 
//     });
//   }
//   return filtered;
// });