
// a factory to create a re-usable Profile object
// we pass in a username and get back their synchronized data as an object
skillFuelApp

.factory("UserTags", ["$firebaseObject",
  function($firebaseObject) {
    return function(userId) {
      // create a reference to the Firebase where we will store our data
      
      var ref = new Firebase("https://skillfuel.firebaseio.com/users/" + userId);
      var tagsRef = ref.child('tags');

      obj = $firebaseObject(tagsRef);

      // return it as a synchronized object
      return obj;

    }
  }
])

.factory("TagContent", ["$firebaseObject",
  function($firebaseObject) {
    return function(tagId) {
      // create a reference to the Firebase where we will store our data
      
      var ref = new Firebase("https://skillfuel.firebaseio.com/tagIds/" + tagId);
      
      obj = $firebaseObject(ref);
      // return it as a synchronized object
      return obj;

    }
  }
])

.factory("UserNeedsKnows", ["$firebaseObject","UserTags","TagContent","$rootScope",
  function($firebaseObject, UserTags, TagContent, $rootScope) {
    return function(userId) {

    console.log("userId in service: " + userId);
    var needsKnowsObj = {needs:{},knows:{}};  

    userTagsObj = UserTags(userId); //creates a UserTags Firebase Object that links to users.userId tags

    userTagsObj.$loaded() // executes the function after the object is properly loaded
        .then(function(data) {
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
                  needsKnowsObj.needs[data.name] = true;
                  console.log("needObj: " + needsKnowsObj.needs[data.name]);
                }
                else if (data.isNeed === false) {
                  needsKnowsObj.knows[data.name] = true;
                  console.log("knowObj: " + needsKnowsObj.knows[data.name]);
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
      
      $rootScope.$broadcast('onNeedsKnowsObj'); // test to send an event to $rootScope
      
      needsKnowsObj;
    }
  }
])

.factory("AllUsers", ["$firebaseArray",
  function($firebaseArray) {
    
    var ref = new Firebase("https://skillfuel.firebaseio.com/users");

    return $firebaseArray(ref);
  }
])
// 'join' service to get tags content from a given user. Uses Firebase.util (throws many warnings because this library is quite old)
.factory("UserTagsContent", ["$firebaseObject",
  function($firebaseObject) {
    return function(userId) {
      console.log(">>>> userId in service util: " + userId);
      var ref = Firebase.util.join(
      {
        ref: new Firebase("https://skillfuel.firebaseio.com/users/" + userId + "/tags/"),
        intersects: true
      },
        new Firebase("https://skillfuel.firebaseio.com/tagIds/")
      );

      return $firebaseObject(ref);
    }
  }
]);

