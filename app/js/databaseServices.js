
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
.factory("AllTags", ["$firebaseArray",
  function($firebaseArray) {
    
    var ref = new Firebase("https://skillfuel.firebaseio.com/tagIds");

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
])
/******************************************************************************************************************
  
  Service with methods to write in the database. 
    Controller just need to call WriteService.newEntry and the rest will be done here
      Now it is being called in firebaseCtrl.js, line 52. We need to organise the modules and names!
    Note that functions are called inside each other. This was made to prevent problems with sync.
      Comments above each one specify the order they are called. 'addUser' starts everything here inside this service
  
  OBS: Generated tags and users IDs are in the Firebase format (randomly with timestamp), which is more reliable
       and easier to use

******************************************************************************************************************/

.factory("WriteService", ["$firebase", "$firebaseArray", "$firebaseObject", "AllUsers",
  function($firebase, $firebaseArray, $firebaseObject, AllUsers) {
     
    var factory = {};
    var newUserId = null;
    var newTagId = null;
    newTagsObj = {}; 

    // called 4th
    var addUserToTag = function (tagId, userId) {
      var ref = new Firebase("https://skillfuel.firebaseio.com/tagIds/" + tagId);
      ref.child('user').set(userId);
    }

    // called 3rd (together with addTagToUser)
    var addTagToTagNames = function (tagName, tagId) {
      var ref = new Firebase("https://skillfuel.firebaseio.com/tagNames/" + tagName);
      ref.child(tagId).set(true);
    }

    // called 3rd
    var addTagToUser = function(userId, tagId) {
      var ref = new Firebase("https://skillfuel.firebaseio.com/users/" + userId + "/tags/" + tagId);
      ref.set(true);
      addUserToTag(tagId, userId);
    }

    //called 2nd
    var createTags = function(newTagsObject) {
      var ref = new Firebase("https://skillfuel.firebaseio.com/tagIds");
      var list = $firebaseArray(ref);

      angular.forEach(newTagsObject, function(value, key) {
        list.$add(value).then(function(ref) {
          var id = ref.key();
          console.log("added tag with id " + id);
          list.$indexFor(id); // returns location in the array
          newTagId = id;
          addTagToUser(newUserId, newTagId);
          addTagToTagNames(value.name, newTagId);
        });
        console.log(Object.keys(value));
        console.log("key: " + key);
      });
    }
   
   // called 1st
    var addUser = function(newUserObj) {
      var ref = new Firebase("https://skillfuel.firebaseio.com/users");
      var list = $firebaseArray(ref);

      list.$add(newUserObj).then(function(ref) {
        var id = ref.key();
        console.log("added user with id " + id);
        list.$indexFor(id); // returns location in the array
        newUserId = id;
        createTags(newTagsObj);
        console.log(Object.keys(newTagsObj));

      });
    }
 
    factory.newEntry = function (newEntryObj) {
      
      newTagsObj = {};  
      
      var i = 0;
      // assembles tag object depending on needs and knows arrays. *** user and project to be added later
      for (var j = 0; j < newEntryObj.needs.length; j++) {
        newTagsObj[i] = {name:'',project:'',isNeed:'',user:''};
        newTagsObj[i].name = newEntryObj.needs[j]; 
        newTagsObj[i].isNeed = true;
        i++;
      };
      for (var j = 0; j < newEntryObj.knows.length; j++) {
        newTagsObj[i] = {name:'',project:'',isNeed:'',user:''};
        newTagsObj[i].name = newEntryObj.knows[j]; 
        newTagsObj[i].isNeed = false;
        i++;
      };

      newUserObj = {
        name : newEntryObj.name,
        title : newEntryObj.title,
        location  : newEntryObj.location
      };

      addUser(newUserObj);

    }
 
    return factory;
}]);

