(function () {
	
	//var model = new FirebaseModel();
	
	var app = angular.module('myApp', ["firebase"]);
	
	/*
	var myFirebaseRef = new Firebase('https://scorching-torch-5112.firebaseio.com/');

	app.controller('MyController', function () {
  		this.data = '';

  		myFirebaseRef.child("Tags").child("1").child("projectid").on("value", function(snapshot) {
  			alert(snapshot.val());
  			this.data = snapshot.val();
		});
	});
	
	*/
	
	app.controller("MyController", ["$scope", "$firebaseArray",
	  function($scope, $firebaseArray) {
		var ref = new Firebase('https://scorching-torch-5112.firebaseio.com/');
		$scope.messages = $firebaseArray(ref);
	  }
	]);

})();