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
    var newProjectId = null; // need to use array in the future (multiple projects)
    var newTagId = null;
    newUserTagsObj = {};
    newProjectTagsObj = {}; 

    // >>> PROJECT ROUTINES TO BE ADDED <<<

    // called 4th
    var addUserToTag = function (tagId, userId) {
      var ref = new Firebase(FBURL + "/tagIds/" + tagId);
      ref.child('user').set(userId);
    }

    // called 4th
    var addProjectToTag = function (tagId, projectId) {
      var ref = new Firebase(FBURL + "/tagIds/" + tagId);
      ref.child('project').set(projectId);
    }

    // called 4th
    var addProjectToUser = function (userId, projectId) {
      var ref = new Firebase(FBURL + "/users/" + userId);
      ref.child('projects').set(true);
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

    // called 3rd
    var addTagToProject = function(projectId, tagId) {
      var ref = new Firebase(FBURL + "/projects/" + projectId + "/tags/" + tagId);
      ref.set(true);
      addProjectToTag(tagId, projectId);
    }

    //called 2nd
    var createTags = function(newTagsObject, toWhere) {
      var ref = new Firebase(FBURL + "/tagIds");
      var list = $firebaseArray(ref);

      angular.forEach(newTagsObject, function(value, key) {
        list.$add(value).then(function(ref) {
          var id = ref.key();
          console.log("added tag with id " + id);
          list.$indexFor(id); // returns location in the array
          newTagId = id;
          if(toWhere === 'user') { // decides if links to user or project
            addTagToUser(newUserId, newTagId);
          }
          else if (toWhere === 'project') {
            addTagToProject(newProjectId, newTagId);
          }
          addTagToTagNames(value.name, newTagId);
        });
        console.log(Object.keys(value));
        console.log("key: " + key);
      });
    }
   
   // called 2nd
   var addProject = function(newProjectObj) {
     var ref = new Firebase(FBURL + "/projects");
     var list = $firebaseArray(ref);

     list.$add(newProjectObj).then(function(ref) {
       var id = ref.key();
        console.log("added project with id " + id);
        list.$indexFor(id); // returns location in the array
        newProjectId = id;
        addProjectToUser(newUserId, newProjectId);
        createTags(newProjectTagsObj, 'project'); // just create tags for this object (has all the new tags)
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
       createTags(newUserTagsObj, 'user'); // just create tags for this object (has all the new tags)
       addProject(newProjectObj);
       console.log(Object.keys(newUserTagsObj));
     });
    }
        
 
    /** 
      * @desc gets object with new data and adds to database 
      * @param Object newEntryObj - the assembled object resulted from new user profile + projects creation 
      * @return (nothing, call other functions inside that manipulate database)
    */  
    factory.newEntry = function (newEntryObj) {
      console.log(Object.keys(newEntryObj.project));
      newUserTagsObj = {};  
      
      var i = 0; // index for all tags obj 
      // assembles object with tags depending on needs and knows arrays. *** user and project to be added later
      // user tags to be added to user.tags in database. Adds to newUserTagsObj from user "independent" tags
      // loops from user tags
      for (var j = 0; j < newEntryObj.needs.length; j++) {
        newUserTagsObj[i] = {name:'',project:'',isNeed:'',user:''};
        newUserTagsObj[i].name = newEntryObj.needs[j]; 
        newUserTagsObj[i].isNeed = true;
        i++;
      };
      for (var j = 0; j < newEntryObj.knows.length; j++) {
        newUserTagsObj[i] = {name:'',project:'',isNeed:'',user:''};
        newUserTagsObj[i].name = newEntryObj.knows[j]; 
        newUserTagsObj[i].isNeed = false;
        i++;
      };

      
      // loops from project tags
      var k = 0; // index for project tags
      
      console.log(Object.keys(newEntryObj.project.name));

      for (var j = 0; j < newEntryObj.project.needs.length; j++) {
        newProjectTagsObj[k] = {name:'',project:'',isNeed:'',user:''}; // adds to project tag obj (index k)
        newProjectTagsObj[k].name = newEntryObj.project.needs[j]; 
        newProjectTagsObj[k].isNeed = true;
        k++;
      };
      for (var j = 0; j < newEntryObj.project.knows.length; j++) {
        newProjectTagsObj[k] = {name:'',project:'',isNeed:'',user:''}; // adds to project tag obj (index k)
        newProjectTagsObj[k].name = newEntryObj.project.knows[j]; 
        newProjectTagsObj[k].isNeed = false;
        k++;
      };

      console.log(Object.keys(newUserTagsObj));
      console.log(Object.keys(newProjectTagsObj));

      newUserObj = {
        name    : newEntryObj.name,
        title   : newEntryObj.title,
        location: newEntryObj.location,
        needs   : newEntryObj.needs, // only tags without project
        knows   : newEntryObj.knows,
        needsAllNames   : newEntryObj.needsAllNames, // only tags without project
        knowsAllNames   : newEntryObj.knowsAllNames,
				imgURL  : newEntryObj.imgURL
      };
        
      newProjectObj = {
        name        : newEntryObj.project.name,
        url         : newEntryObj.project.url,
//        create_date : newEntryObj.project.createOn,
//        start_date  : newEntryObj.project.startOn,
        description : newEntryObj.project.description,
        pics        : newEntryObj.project.pics
      };
        
      addUser(newUserObj);
      //addProject(newProjectObj);
  }
    return factory;
}]);

