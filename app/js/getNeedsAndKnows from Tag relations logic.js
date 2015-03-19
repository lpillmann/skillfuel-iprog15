  
  // KEEP THIS FILE (logic to get needs and knows using tag relations)

  // Gets data to populate 'Needs' and 'Knows' profiles. It is working, but it's not binded in real-time, though. Do we need it to be?
  // // It has been implemented here due to complications with callbacks when calling from the model. Possibly change this in the future
  // // Waits to load users and start checking routines to see if the Tags are needs or knows and store them accordingly to be printed
  // $scope.users.$loaded()
  //     .then(function(usersData){  // once loaded, usersData will hold the object
  //       console.log("$scope.users loaded.");
        
  //       // create auxiliary object to hold the needs and knows, once it's not possible/convenient to 
  //       // edit $scope.users directly (it's a Firebase array)
  //       $scope.usersNeedsKnows = {}; 
  //       $scope.needsArray = [];
  //       $scope.knowsArray = [];

  //       // iterate through the users. 'key' gets Firebase array indexes (0,1,2,...); 'value' gets users.userX objects 
  //       angular.forEach(usersData, function(value, key) { 
  //         userTagsContent = ReadService.UserTagsContent(value.$id); // uses 'join' service to get tags (with content) from a user
          
  //         userTagsContent.$loaded()
  //             .then(function(userTagsData){ 
		// 						//console.log("$scope.userTagsContent loaded."); 
  //               console.log(Object.keys(userTagsData));

  //               $scope.usersNeedsKnows[value.$id] = {needs: {},knows: {}}; // create user field in the auxiliary object with needs/knows keys
                                
  //               // iterate through user tags content. '_key' receives tag ids (tag1, tag2, ...) ; '_value' receives each tag's content
  //               angular.forEach(userTagsData, function(_value, _key) {
  //                 //debug
		// 							//console.log(Object.keys(_value));
  //                     if(_value.isNeed === true) {
  //                       // Inserts values to the aux. object. 'value.$id' has user ID, '_value.name' has tag name
  //                       $scope.usersNeedsKnows[value.$id].needs[_value.name] = true; 
  //                       //console.log(Object.keys($scope.usersNeedsKnows[value.$id].needs));
  //                     }
  //                     else if (_value.isNeed === false) {
  //                       $scope.usersNeedsKnows[value.$id].knows[_value.name] = true; 
  //                       //console.log(Object.keys($scope.usersNeedsKnows[value.$id].knows));
  //                     }
  //                     //console.log(Object.keys($scope.usersNeedsKnows[value.$id]));
  //               })
  //             })
  //             .catch(function(error){
  //               console.error("Error:", error);
  //             });
  //       });

  //     })
  //     .catch(function(error){
  //       console.error("Error:", error);
  //     });