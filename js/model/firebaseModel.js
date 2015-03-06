var FirebaseModel = function() {
	
	var myFirebaseRef = new Firebase("https://scorching-torch-5112.firebaseio.com/");
		
	myFirebaseRef.child("Tagnames").child("1").child("Name").on("value", function(snapshot) {
	  alert(snapshot.val());
	});
		
	
	this.getTagNames() {
		
	}
		
}