  
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
  //         userTagsContent = ReadService.getUserTagsContent(value.$id); // uses 'join' service to get tags (with content) from a user
          
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



  // // From profile (only one user)
  //     userLocal = ReadService.getUserBasicInfo(id);

  //   // waits user basic info to load. When loaded, defines variable in $scope (visible to HTML)
  //   userLocal.$loaded()
  //     .then(function(data){ 
  //       console.log("userBasicInfo LOADED for: " + data.$ref());
  //       $scope.user = data;
  //     })
  //     .catch(function(error){
  //     console.error("Error:", error);
  //     });

  //   userTagsObj = ReadService.getUserTags($scope.userId); //creates a getUserTags Firebase Object that links to users.userId tags
  //   userTagsObj.$bindTo($scope, "tags");

  //   userTagsObj.$loaded() // executes the function after the object is properly loaded
  //       .then(function(data) {
  //         $scope.needTags = []; // Arrays that will receive tag names got from query. Binded to scope, which means they can be called in the HTML
  //         $scope.knowTags = []; // ng-repeat is used to iterate through them         
          
  //         var i = 0; // indexes to debug 
  //         var j = 0;

  //         // Iterate through the  user tags object. For each tag, refers to its content in Firebase.tagsId, gets the tag name and puts it in 
  //         // the proper array (needTags or knowTags).
          // angular.forEach(userTagsObj, function(value, key) { // 'key' gets tagId, 'value' gets true
          //   tagObj = ReadService.getTagContent(key); // creates a getTagContent Firebase Object that links to tags.tagId (tagId = key, comes from before) tags
          //   console.log("tagObj CREATED for: " + tagObj.$ref()); 
            
          //   tagObj.$loaded()
          //     .then(function(data){ // executes the function after the object is properly loaded. 
          //       // 'data' is equal to tagIds.tagX (one tag object listed in Firebase.tagsId) where tagX is 'key' from above 
          //       console.log("tagObj LOADED for: " + data.$ref());
                
          //       if(data.isNeed === true) {
          //         $scope.needTags.push(data.name);
          //         console.log("needTags: " + $scope.needTags[i]);
          //         i++;
          //       }
          //       else if (data.isNeed === false) {
          //         $scope.knowTags.push(data.name);
          //         console.log("knowTags: " + $scope.knowTags[j]);
          //         j++;
          //       }
          //     })
          //     .catch(function(error){
          //     console.error("Error:", error);
          //     });
          // })
  //       })
  //       .catch(function(error) {
  //         console.error("Error:", error);
  //       }); 
  //     });