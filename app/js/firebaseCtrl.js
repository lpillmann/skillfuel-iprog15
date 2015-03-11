<<<<<<< HEAD
skillFuelApp.controller("FirebaseCtrl", function( $scope, $firebaseObject, $firebaseArray) {//, $firebaseAuth) {
  
  var ref = new Firebase("https://sizzling-heat-4392.firebaseio.com/name");
  var refMessages = new Firebase("https://sizzling-heat-4392.firebaseio.com/messages");
  var refUsers = new Firebase("https://sizzling-heat-4392.firebaseio.com/users");
  
   // download the data into a local object
  var syncObject = $firebaseObject(ref);
  
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");

  // create a synchronized array
  $scope.messages = $firebaseArray(refMessages);
  $scope.users = $firebaseArray(refUsers);

  // add new items to the array
  // the message is automatically added to Firebase!
  $scope.addMessage = function() {
    $scope.messages.$add({
      text: $scope.newMessageText
    });
  };

=======
skillFuelApp.controller("FirebaseCtrl", ['$scope', 'SkillFuel', function( $scope, SkillFuel) {//, $firebaseAuth) {
  
  // Used by Search view
  $scope.getUsers = function () {
    return SkillFuel.getUsers();
  }

  $scope.users = $scope.getUsers();

  // Used by Profile creation view
  var newUserObj = {};

  // arrays that hold the skills being added in the profile creation
  $scope.needsArray = [];
  $scope.knowsArray = [];

  // New way (with service)
  // Functions that are called in the HTML file (with directives) must be binded to $scope to be visible there
  $scope.addSkill = function (skillType, skill) {
    SkillFuel.addSkill(skillType, skill);
    // clears input field depending on skillType
    if (skillType === "need")
      $scope.newUserNeed = ""; 
    else if (skillType === "know") 
      $scope.newUserKnow = "";
  };

  $scope.getSkillsArray = function (skillType) {
    return SkillFuel.getSkillsArray(skillType);
  }

  $scope.emptySkillsArray = function (skillType) {
    return SkillFuel.emptySkillsArray(skillType);
  }

  $scope.addUser = function() {
    // creates object with new info from form
    newUserObj = {
      'name':     $scope.newUserName,
      'title':    $scope.newUserTitle,
      'location': $scope.newUserLocation,
      'skills': {
        'need': $scope.getSkillsArray('need'),
        'know': $scope.getSkillsArray('know')
      }
    }
    // requests user creation by the service
    SkillFuel.addUser(newUserObj);

    // cleans variables to be used by the next profile creation (provides submition feedback also)
    // because it is a "view issue", we keep it here and not in the service
    $scope.emptySkillsArray('need');
    $scope.emptySkillsArray('know');
    $scope.newUserName      = "";
    $scope.newUserTitle     = "";
    $scope.newUserLocation  = "";
  };

  /*OLD WAY
  $scope.addSkill = function (skillType) {
    switch (skillType) { // depending on the skill type, it adds the value to the proper array
      case 'need':
        $scope.needsArray.push($scope.newUserNeed);
        $scope.newUserNeed = ""; // clears input field
      break;
      case 'know':
        $scope.knowsArray.push($scope.newUserKnow);
        $scope.newUserKnow = ""; // clears input field
      break;
      default:
        alert("error 007!"); 
    };
  };

  // adds user with all the information that was filled in the form fields (bugs when fields are empty)
>>>>>>> Firebase-as-a-Angular-service
  $scope.addUser = function() {
    $scope.users.$add({
      name:     $scope.newUserName,
      title:    $scope.newUserTitle,
      location: $scope.newUserLocation,
<<<<<<< HEAD
      need:     $scope.newUserNeed,
      know:     $scope.newUserKnow
    });
  };

=======
      skills: {
        need: $scope.needsArray,
        know: $scope.knowsArray
      }
    });

    $scope.needsArray = []; // cleans variables to be used by the next profile creation (provides submition feedback also)
    $scope.knowsArray = [];
    $scope.newUserName      = "";
    $scope.newUserTitle     = "";
    $scope.newUserLocation  = "";
  };
  */
>>>>>>> Firebase-as-a-Angular-service

  /*// AUTHENTICATION (to be configured later if necessary)
  // create an instance of the authentication service
  var auth = $firebaseAuth(ref);
  // login with Facebook
  auth.$authWithOAuthPopup("facebook").then(function(authData) {
    console.log("Logged in as:", authData.uid);
  }).catch(function(error) {
    console.log("Authentication failed:", error);
  });
  */

<<<<<<< HEAD
});
=======
}]);
>>>>>>> Firebase-as-a-Angular-service
