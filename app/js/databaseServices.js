/**  
  * @desc these services will hold functions for database (Firebase) read/write (conceptual system MODEL --> holds database and functions to manipulate it)
  * examples include ReadService.UserTagsContent, ReadService.AllUsers, WriteService.newEntry
  * @required AngularFire services ($firebaseArray, $firebaseObject)  
  * @used_by newEntryViewHandler.js, searchUsersCtrl.js, searchProjectsCtrl.js
*/  
skillFuelApp
.factory("ReadService", ["$firebaseArray", "$firebaseObject",
  function($firebaseArray, $firebaseObject) {
    var factory = {};

    var FBURL = "https://skillfuel.firebaseio.com";

    factory.AllUsers = function () {  
      var ref = new Firebase(FBURL + "/users");
      return $firebaseArray(ref);
    }

    factory.getUserBasicInfo = function (userId) {  
      var ref = new Firebase(FBURL + "/users/" + userId);
      return $firebaseObject(ref);
    }

    factory.AllTags = function () {  
      var ref = new Firebase(FBURL + "/tagIds");
      return $firebaseArray(ref);
    }

    factory.AllTagNames = function () {  
      return AllTagNames;
    }

    var AllTagNames = function () {  
      var ref = new Firebase(FBURL + "/tagNames");
      return $firebaseArray(ref);
    }

    factory.AllTagNamesAsArray = function () {  
      var arr = [];
      obj = AllTagNames();

      obj.$loaded()
              .then(function(data){ 
                angular.forEach(data, function(value, key) {
                  arr.push(value.$id);
                  //debug
									//console.log("tag names as array, pushed: " + value.$id)
                  //console.log(Object.keys(data));
                  //console.log("key: " + key);
                });
                  
              })
              .catch(function(error){
                console.error("Error:", error);
              });
      return arr;
    }

    factory.AllTagNamesAsString = function () {  
      var str = '';
      obj = AllTagNames();

      obj.$loaded()
              .then(function(data){ 
                angular.forEach(data, function(value, key) {
                  str += value.$id;
                  console.log("tag names as string, concatenated: " + value.$id)
                  console.log(Object.keys(data));
                  //console.log("key: " + key);
                });
                  
              })
              .catch(function(error){
                console.error("Error:", error);
              });
      return str;
    }
    
    // 'join' service to get tags content from a given user. Uses Firebase.util 
    // (throws many warnings because this library is quite old)
    factory.UserTagsContent = function (userId) {  
      //debug
			//console.log(">>>> userId in service util: " + userId);
      var ref = Firebase.util.join(
      {
        ref: new Firebase(FBURL + "/users/" + userId + "/tags/"),
        intersects: true
      },
        new Firebase(FBURL + "/tagIds/")
      );

      return $firebaseObject(ref);
    }

    factory.TagContent = function (tagId) {  
      var ref = new Firebase(FBURL + "/tagIds/" + tagId);
      
      obj = $firebaseObject(ref);
      // return it as a synchronized object
      return obj;
    }

    factory.UserTags = function (userId) {  
      // create a reference to the Firebase where we will store our data
      var ref = new Firebase(FBURL + "/users/" + userId);
      var tagsRef = ref.child('tags');

      obj = $firebaseObject(tagsRef);
      
      // return it as a synchronized object
      return obj;
    }

    return factory;
    
  }
])
/****************************************************************************************************************** 
  Service with methods to write in the database. 
    Controller just need to call WriteService.newEntry and the rest will be done here
  
    Note that most of the functions are internal and called inside each other. This was made to prevent problems 
    with sync.
    
    Comments above each one specify the order they are called. 'addUser' starts everything here inside this service
    
    Argument objects are "assembled" in factory.newEntry and given to 'addUser'
      *** New routines for writing must start by formating the objects in this function

  OBS: Generated tags and users IDs are in the Firebase format (randomly with timestamp), which is more reliable
       and easier to use (e.g. order by date of creation)
******************************************************************************************************************/

.factory("WriteService", ["$firebaseArray", "$firebaseObject",
  function($firebaseArray, $firebaseObject) {
     
    var factory = {};

    var FBURL = "https://skillfuel.firebaseio.com";
    
    var newUserId = null;
    var newTagId = null;
    newTagsObj = {}; 

    // >>> PROJECT ROUTINES TO BE ADDED <<<

    // called 4th
    var addUserToTag = function (tagId, userId) {
      var ref = new Firebase(FBURL + "/tagIds/" + tagId);
      ref.child('user').set(userId);
    }

    // called 3rd (together with addTagToUser)
    var addTagToTagNames = function (tagName, tagId) {
      var ref = new Firebase(FBURL + "/tagNames/" + tagName);
      ref.child(tagId).set(true);
    }

    // called 3rd
    var addTagToUser = function(userId, tagId) {
      var ref = new Firebase(FBURL + "/users/" + userId + "/tags/" + tagId);
      ref.set(true);
      addUserToTag(tagId, userId);
    }

    //called 2nd
    var createTags = function(newTagsObject) {
      var ref = new Firebase(FBURL + "/tagIds");
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
      var ref = new Firebase(FBURL + "/users");
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
 
    /** 
      * @desc gets object with new data and adds to database 
      * @param Object newEntryObj - the assembled object resulted from new user profile + projects creation 
      * @return (nothing, call other functions inside that manipulate database)
    */  
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

