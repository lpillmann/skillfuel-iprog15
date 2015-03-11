skillFuelApp.controller("FirebaseCtrl", ['$scope', '$firebaseObject', '$firebaseArray', 'SkillFuel', function( $scope, $firebaseObject, $firebaseArray, SkillFuel) {//, $firebaseAuth) {
  
  var ref = new Firebase("https://sizzling-heat-4392.firebaseio.com/name");
  var refUsers = new Firebase("https://sizzling-heat-4392.firebaseio.com/users");

/*  // download the data into a local object (Example of how to do a 3-way binding)
  var syncObject = $firebaseObject(ref);
  
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");*/

  // create a synchronized array
  $scope.users = $firebaseArray(refUsers);
  
  // arrays that hold the skills being added in the profile creation
  $scope.needsArray = [];
  $scope.knowsArray = [];

  // function to add skill in input field to temporary arrays. These arrays will later be added to the user profile in $scope.addUser()

/*OLD WAY*/
/*  $scope.addSkill = function (skillType) {
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
  };*/


  //New way (with service)
  $scope.addSkill = function (skillType, skill) {
    SkillFuel.addSkill(skillType, skill);
  };

  $scope.getSkillsArray = function (skillType) {
    return SkillFuel.getSkillsArray(skillType);
  }


  // Old way
  // adds user with all the information that was filled in the form fields (bugs when fields are empty)
  $scope.addUser = function() {
    $scope.users.$add({
      name:     $scope.newUserName,
      title:    $scope.newUserTitle,
      location: $scope.newUserLocation,
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

}]);