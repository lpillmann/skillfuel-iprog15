skillFuelApp.controller("FirebaseCtrl", function( $scope, $firebaseObject, $firebaseArray) {//, $firebaseAuth) {
  
  var ref = new Firebase("https://sizzling-heat-4392.firebaseio.com/name");
  var refMessages = new Firebase("https://sizzling-heat-4392.firebaseio.com/messages");
  
   // download the data into a local object
  var syncObject = $firebaseObject(ref);
  
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");

  // create a synchronized array
  $scope.messages = $firebaseArray(refMessages);

  // add new items to the array
  // the message is automatically added to Firebase!
  $scope.addMessage = function() {
    $scope.messages.$add({
      text: $scope.newMessageText
    });
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