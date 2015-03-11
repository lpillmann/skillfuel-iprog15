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

  $scope.addUser = function() {
    $scope.users.$add({
      name:     $scope.newUserName,
      title:    $scope.newUserTitle,
      location: $scope.newUserLocation,
      need:     $scope.newUserNeed,
      know:     $scope.newUserKnow
    });
  };
	
	
	
	function chunk(users, size) {
			var chunks = {};
			for (i=0; i<users.length; i+=size) {
				chunks.push(users.slice(i,i+=size));
			}
			return chunks;
	};
	
	// Trying to split up the users data into chunks for columns
	// still not working
	/*
	
	$scope.usersJsArray = [];
	$scope.users.$loaded().then(function(users) {
		console.log(users.length); // data is loaded here
		
		for (var i = 0; i < $scope.users.length; i++) {
			$scope.usersJsArray[i] = {};
			console.log($scope.users[i]);
			
			$scope.usersJsArray[i]['location']= $scope.users[i].location;
			$scope.usersJsArray[i]['name']= $scope.users[i].name;
			$scope.usersJsArray[i]['skills'] =  $scope.users[i].skills;
			$scope.usersJsArray[i]['title'] =  $scope.users[i].title;
			
		}
		console.log($scope.usersJsArray);
		
		$scope.chunkedData = chunk($scope.usersJsArray, 2);
		
		console.log($scope.chunkedData);
	});
	*/
	
	
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