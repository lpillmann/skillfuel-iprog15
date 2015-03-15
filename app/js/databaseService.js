
// a factory to create a re-usable Profile object
// we pass in a username and get back their synchronized data as an object
skillFuelApp.factory("UserTags", ["$firebaseObject",
  function($firebaseObject) {
    return function(userId) {
      // create a reference to the Firebase where we will store our data
      
      var ref = new Firebase("https://skillfuel.firebaseio.com/users/" + userId);
      var tagsRef = ref.child('tags');

      Obj = $firebaseObject(tagsRef);

      // return it as a synchronized object
      return Obj;

    }
  }
]);

skillFuelApp.factory("TagContent", ["$firebaseObject",
  function($firebaseObject) {
    return function(tagId) {
      // create a reference to the Firebase where we will store our data
      
      var ref = new Firebase("https://skillfuel.firebaseio.com/tagIds/" + tagId);
      
      obj = $firebaseObject(ref);
      // return it as a synchronized object
      return obj;

    }
  }
]);

skillFuelApp.controller("SearchByTagsCtrl", ["$scope", "UserTags", "TagContent",
  function($scope, UserTags, TagContent) {
    // create a three-way binding to our Profile as $scope.profile
    $scope.userId = 'user1';

    userTagsObj = UserTags($scope.userId); //creates a UserTags Firebase Object that links to users.userId tags
    userTagsObj.$bindTo($scope, "tags");

    userTagsObj.$loaded() // executes the function after the object is properly loaded
        .then(function(data) {
          $scope.needTags = []; // Arrays that will receive tag names got from query. Binded to scope, which means they can be called in the HTML
          $scope.knowTags = []; // ng-repeat is used to iterate through them         
          
          var i = 0; // indexes to debug 
          var j = 0;

          // Iterate through the  user tags object. For each tag, refers to its content in Firebase.tagsId, gets the tag name and puts it in 
          // the proper array (needTags or knowTags).
          angular.forEach(userTagsObj, function(value, key) { // 'key' gets tagId, 'value' gets true
            tagObj = TagContent(key); // creates a TagContent Firebase Object that links to tags.tagId (tagId = key, comes from before) tags
            console.log("tagObj CREATED for: " + tagObj.$ref()); 
            
            tagObj.$loaded()
              .then(function(data){ // executes the function after the object is properly loaded. 
                // 'data' is equal to tagIds.tagX (one tag object listed in Firebase.tagsId) where tagX is 'key' from above 
                console.log("tagObj LOADED for: " + data.$ref());
                
                if(data.isNeed === true) {
                  $scope.needTags.push(data.name);
                  console.log("needTags: " + $scope.needTags[i]);
                  i++;
                }
                else if (data.isNeed === false) {
                  $scope.knowTags.push(data.name);
                  console.log("knowTags: " + $scope.knowTags[j]);
                  j++;
                }

              })
              .catch(function(error){
              console.error("Error:", error);
              });
          })
        })
        .catch(function(error) {
          console.error("Error:", error);
        });
  }
]);