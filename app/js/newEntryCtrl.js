/** 
  * @desc populates the view and gathers data from inputs (one of the conceptual system VIEWS --> populates page, among other controller-related functions)
  * @required databaseServices.js, newEntryViewHandler.js
  * @used_by new-profile.html
*/ 
skillFuelApp.controller("NewEntryCtrl", ['$scope', '$upload','WriteService', 
  function($scope, $upload, WriteService) {

  $scope.newUserName      = "";
  $scope.newUserTitle     = "";
  $scope.newUserLocation  = "";

  // Used by Profile creation view
  var newUserObj = {};
	
	$scope.imgURL = "";
	$scope.isloading = false;
  // arrays that hold the skills being added in the profile creation
  $scope.needsArray = [];
  $scope.knowsArray = [];

  $scope.createProjectVisible = false;

  $scope.newEntry = function() {
    // creates object with new info from form
    console.log("add user from scope");
    newEntryObj = {
      'name':     $scope.newUserName,
      'title':    $scope.newUserTitle,
      'location': $scope.newUserLocation,
      'needs': $scope.skills.needs,
      'knows': $scope.skills.knows,
			'imgURL': $scope.imgURL ,
        
        'project':[{
        
            'name': $scope.projectName,
            'url': $scope.projectUrl,
            'description': $scope.projectDescription,
            'pics': '',//$scope.projectPics,
            'needs': $scope.projectNeeds,
            'knows': $scope.projectKnows 
        
            }]        
    };
    // requests user creation by the service
    WriteService.newEntry(newEntryObj);

    // cleans variables to be used by the next profile creation (provides submition feedback also)
    // because it is a "view issue", we keep it here and not in the service
    $scope.skills.needs = [];
    $scope.skills.knows = [];
    $scope.newUserName      = "";
    $scope.newUserTitle     = "";
    $scope.newUserLocation  = "";
  };
	
	$scope.$watch('files', function () {
			$scope.upload($scope.files);
	});

	$scope.upload = function (files) {
			if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
							var file = files[i]
							var fileReader = new FileReader();
							fileReader.readAsArrayBuffer(file);
							fileReader.onload = function(e) {
									$scope.isloading=true;
									$upload.http({
											url: 'https://api.imgur.com/3/image',
											headers: {
												'Content-Type': file.type,
												'Authorization': 'Client-ID 4858d2a8e5879a4'},
											data: e.target.result
									}).then(function(response) {
											$scope.isloading=false;
											$scope.imgURL = response.data.data.link;
											console.log('Response object:' + JSON.stringify(response));
											console.log('Link to imgur: ' + $scope.imgURL);//success;
											
									}, null, function(evt) {
											$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
									});
							}
							
					}
			}
	};

}]);