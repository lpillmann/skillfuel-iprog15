(function () {
	
	//var model = new FirebaseModel();
	
	var app = angular.module('myApp', []);
	
	var myFirebaseRef = new Firebase('https://sizzling-heat-4392.firebaseio.com/');


	app.controller('MyController', function () {
  		this.data = '';

  		myFirebaseRef.child("Person/Name").on("value", function(snapshot) {
  			
  			this.data = snapshot.val();
		});
	});
	
	
	

})();