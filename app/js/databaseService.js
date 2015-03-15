
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

    userTagsObj = UserTags($scope.userId);
    userTagsObj.$bindTo($scope, "tags");

    userTagsObj.$loaded()
        .then(function(data) {
          $scope.needTags = [];
          $scope.knowTags = [];          
          var i = 0; // indexes to debug 
          var j = 0;

          angular.forEach(userTagsObj, function(value, key) { //key gets tagId, value gets true
            tagObj = TagContent(key); // gets the tag content of the tags 
            console.log("tagObj ref " + tagObj.$ref());
            tagObj.$loaded()
              .then(function(data){
                console.log("loaded tagObj " + data.$ref());
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
          
          console.log(data === userTagsObj); // true
          console.log("entered firebase factory: " + userTagsObj.tag1);
          console.log("entered firebase factory: " + userTagsObj.tag3);

        })
        .catch(function(error) {
          console.error("Error:", error);
        });
  }
]);