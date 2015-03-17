// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
skillFuelApp.factory('SkillFuel',function ($resource, $firebaseObject, $firebaseArray) {
  
  // tried to parametrise with this constant, but errors occurred
  //var FIREBASE_URL = "https://sizzling-heat-4392.firebaseio.com";
  var URL = "https://skillfuel.firebaseio.com/";
  
  var tagIdsRef   = new Firebase(URL + "/tagIds");
  var tagNamesRef = new Firebase(URL + "/tagNames");
  var usersRef    = new Firebase(URL + "/users");
  var projectsRef = new Firebase(URL + "/projects");
  
  // create a synchronized array
  var users = $firebaseArray(usersRef);

  // arrays that hold the skills being added in the profile creation
  var needsArray = [];
  var knowsArray = [];

  // manouver to handle outer variables and functions inside "this." functions
  that = this;

  /*****************************************************************************************/
  /*                              Tag-based database (new, March 13)                       */
  /*****************************************************************************************/

  // Scenario 0: Get user's or project's needs/knows (GENERIC FUNCTION)
  
  this.getTags = function (fromWhat, Id, skillType) {
    console.log("getTags called (" + fromWhat + ", " + Id + ", " + skillType + ")");
    
    // according to parameter, changes the reference 'ref' (to not to write similar function twice)
    if      (fromWhat === 'users')    {ref = usersRef}
    else if (fromWhat === 'projects') {ref = projectsRef}
    else {
      console.log("fromWhat not recognised. Stopped method before expected.");
      return;
    }

    if ((Id === null)) {
      console.log("skillType not recognised. Stopped method before expected.");
      return;
    }

    // transforms "friendly" variable skillType into the boolean used in the database
    if      (skillType === 'need') {isNeed = true}
    else if (skillType === 'know') {isNeed = false}
    else {
      console.log("isNeed not recognised. Stopped method before expected.");
      return;
    }

    refTagsRef = ref.child(Id).child('tags'); // reference to users.userX.tags
    
    var tagsArray = [];
    
    /******************************************************************
      FIREBASE QUERY
      Finds tags under user, checks each one if it is the desired type.
      If it is, pushes to array to be returned.
    ******************************************************************/
    refTagsRef.on("child_added", function(snap) { 
      // 'snap' receives tags in ref.tags object
      tagIdsRef.child(snap.key()).on("value", function(snapshot) {
        // 'snapshot' receives tag information inside tagId.tag object
        // tags inside tagIds object are the actual tags (have name, userId, projectId and isNeed)

        // if the tagIds.tagX.isNeed has value as same as skillType (need/know)
        if(snapshot.val().isNeed === isNeed) {
          tagsArray.push(snapshot.val().name);  // pushes ref element to the array
          console.log("Pushed element (" + fromWhat +"): " + snapshot.val().name);
        }
      });
    });
    /*****************************************************************/
    console.log("return tagsArray. length:" + tagsArray.length);
    
    $.each(tagsArray, function(index, tag) {
      console.log("reading array: " + tag);  
    });

    for (var i = 0; i < tagsArray.length; i++) {
      console.log(">>> reading array: " + tagsArray[i]);  
    };

    obj = toObject(tagsArray);

    console.log("type: " + typeof(obj));

    return obj;
  }

  // // Scenario 1: Get user's needs/knows
  // this.getUserTags = function (userId, skillType) {
  //   var tagsArray = [];

  //   // transforms "friendly" variable skillType into the boolean used in the database
  //   if      (skillType === 'need') {isNeed = true}
  //   else if (skillType === 'know') {isNeed = false} 

  //   userTagsRef = usersRef.child(userId).child('tags'); // reference to users.userX.tags
    
  //   /******************************************************************
  //     Finds tags under user, checks each one if it is the desired type.
  //     If it is, pushes to array to be returned.
  //   ******************************************************************/
  //   userTagsRef.on("child_added", function(snap) {
  //     // 'snap' receives tags in users.tags object
  //     tagIdsRef.child(snap.key()).once("value", function(snapshot) {
  //       // 'snapshot' receives tag information inside tagId.tag object
  //       // tags inside tagIds object are the actual tags (have name, userId, projectId and isNeed)
        
  //       // if the tagIds.tagX.isNeed has value as same as skillType (need/know)
  //       if(snapshot.val().isNeed === isNeed) {
  //         tagsArray.push(snapshot.val().name);  // pushes users element to the array
  //       }
  //     });
  //   });
  //   /*****************************************************************/
  //   return tagsArray;
  // }

  // // Scenario 2: Get project's needs/knows
  // this.getProjectTags = function (projectId, skillType) {
  //   var tagsArray = [];

  //   // transforms "friendly" variable skillType into the boolean used in the database
  //   if      (skillType === 'need') {isNeed = true}
  //   else if (skillType === 'know') {isNeed = false} 

  //   projectTagsRef = projectsRef.child(projectId).child('tags'); // reference to users.userX.tags
    
  //   /******************************************************************
  //     Finds tags under project, checks each one if it is the desired type.
  //     If it is, pushes to array to be returned.
  //   ******************************************************************/
  //   userTagsRef.on("child_added", function(snap) {
  //     // 'snap' receives tags in project.tags object
  //     tagIdsRef.child(snap.key()).once("value", function(snapshot) {
  //       // 'snapshot' receives tag information inside tagId.tag object
  //       // tags inside tagIds object are the actual tags (have name, userId, projectId and isNeed)
        
  //       // if the tagIds.tagX.isNeed has value as same as skillType (need/know)
  //       if(snapshot.val().isNeed === isNeed) {
  //         tagsArray.push(snapshot.val().name);  // pushes users element to the array
  //       }
  //     });
  //   });
  //   /*****************************************************************/
  //   return tagsArray;
    
  // }

  // Scenario 3: Get users by needs/knows
  this.getUsersByTagName = function (tagName, skillType) {
    
  }
  // Scenario 4: Get projects by needs/knows
  this.getProjectsByTagName = function (tagName, skillType) {
    
  }
  

  /*****************************************************************************************/

  // function to add skill in input field to temporary arrays. 
  //These arrays will later be added to the user profile in $scope.addUser()
  this.addSkill = function (skillType, skill) {
    console.log("called from service");
    switch (skillType) { // depending on the skill type, it adds the value to the proper array
      case 'need':
        needsArray.push(skill);
        //newUserNeed = ""; // clears input field
      break;
      case 'know':
        knowsArray.push(skill);
        //newUserKnow = ""; // clears input field
      break;
      default:
        alert("error 007!"); 
    };
  };

  this.removeSkill = function (skillType, skill) {
    switch (skillType) { // depending on the skill type, it adds the value to the proper array
      case 'need':
      
        needsArray.remove(skill);
        //newUserNeed = ""; // clears input field
      break;
      case 'know':
        knowsArray.remove(skill);
        //newUserKnow = ""; // clears input field
      break;
      default:
        alert("error 008!"); 
    }
  }

  this.getSkillsArray = function (skillType) {
    if (skillType === "need")
      return needsArray;
    else if (skillType === "know") 
      return knowsArray;
  }

  // clears arrays when view requests
  this.emptySkillsArray = function (skillType) {
    if (skillType === "need")
      needsArray = [];
    else if (skillType === "know") 
      knowsArray = [];
  }

  /*//OLD WAY (Firebase array)
  this.addUser = function(newUserObj) {
    users.$add(newUserObj);
  }*/

  this.addUserToTag = function (userId, tagId, skillType) {
    tagsRef.child(tagId).child('users').child(userId).set(skillType);
  }

  this.getTagIdByName = function (tagName) {
    // ToDo!!! (just a dummy function by now)
    return tagName;
  }

  // adds user to Firebase.users object and registers skill tags to Firebase.tags  
  this.addUser = function(newUserObj) {
    // this variable will hold the "weird" ID Firebase gives to new elements created by push()
    // *** using random variables is the recommended approach for real implementation given it avoids 
    // name conflicts (more than one user creating the profile at the same time)
    var newUserRef = usersRef.push(newUserObj);

    // Get the unique ID generated by push()
    var userId = newUserRef.key();
    console.log("new user: " + userId);

    //add user ID to Firebase.tags

    /// needs loop: add user ID to tags from the array create in the new profile
    $.each(newUserObj.skills.need, function(index, userNeed) {
      that.addUserToTag(userId,that.getTagIdByName(userNeed),'need');  
    });

    /// knows loop: add user ID to tags from the array create in the new profile
    $.each(newUserObj.skills.know, function(index, userKnow) {
      that.addUserToTag(userId,that.getTagIdByName(userKnow),'know');  
    });
  }

  this.getUsers = function() {
    return users;
  }

  /*****************************************************************************************/
  /*                              Support functions                                        */
  /*****************************************************************************************/

  // function to remove element from array by value  
  //(http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value)
  Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
  };

  // converts array into object
  function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
    console.log("new obj: " + arr[i]);
  return rv;
  }

/*****************************************************************************************/

  // Experimenting with Tag-based database

  /*
    Get users by skill ID and skill type (need or know)
    - reads Firebase.tags object and returns Firebase.users with that particular skill and type
    Returns: array of users with all properties that match the parameters
  */
  this.getUsersBySkillId = function (skillType, skill) {
    
    if ((skillType !== 'need') && (skillType !== 'know') || !skill) {
      return ['please insert valid values in both fields'];
    }
    else {
      //array to accommodate results
      var usersByTag = [];
      // references to users and tags objects in Firebase
      var usersRef =
          new Firebase("https://sizzling-heat-4392.firebaseio.com/users");
      var tagRef =
          new Firebase("https://sizzling-heat-4392.firebaseio.com/tags");

      // reference to all the users that are registered under a given tag (skill)
      var tagUsersRef = tagRef.child(skill).child("users");

      // finds users under a tag AND skill type (need or know)
      // if the users under the tag have the desired skill type, it pushes to the array
      tagUsersRef.on("child_added", function(snap) {
        // 'snap' receives users in tags.users object
        // users there have either 'need' or 'know' as values
        usersRef.child(snap.key()).once("value", function(snapshot) {
          // 'snapshot' receives users inside users object
          // users inside users object are the actual objects (have name, title and location)
          console.log("getUsersBySkillId called. >>" + snapshot.key() + " : " + snap.val());
            // if the tags.users.userX has value as same as skillType (need/know)
            if(snap.val() === skillType) {
              usersByTag.push(snapshot.val());  // pushes users element to the array
            }
            else {
              console.log("not right skilltype");
            }
        });
      });
      
      if(usersByTag.length !==0) {
        usersByTag = usersByTag.filter(function(n){ return n != undefined }); // filter out null values
        return usersByTag;
      }
        
      
    }
  }



  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});