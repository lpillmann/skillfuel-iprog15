skillFuelApp.controller("FirebaseCtrl", function( $scope, $firebaseObject, $firebaseArray) {//, $firebaseAuth) {
  
  var ref = new Firebase("https://sizzling-heat-4392.firebaseio.com/name");
  var refMessages = new Firebase("https://sizzling-heat-4392.firebaseio.com/messages");
  var refUsers = new Firebase("https://sizzling-heat-4392.firebaseio.com/users");

  // object that hold the skills (to be inserted in the user profile later)
  var skills = {
    'know':
      {},
    'need':
      {}
  };

  // download the data into a local object
  var syncObject = $firebaseObject(ref);
  
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");

  // try to reference existing data
  ref.child('users/');

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

  $scope.needsArray = [];
  $scope.knowsArray = [];

  // function to add skill in input field to a temporary object. This object will later be added to the user profile in $scope.addUser()
  $scope.addSkill = function (skillType) {
    switch (skillType) { // complete with cases for adding
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

  /*var skillType = 'know';
  $.extend(skills[skillType], {"hello": { "label":"Hello", "url":"#hello" }});    */

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
    $scope.needsArray = []; // cleans both arrays of needs to be used by the next profile creation
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

});