/** 
  * @desc populates the view and gathers data from inputs (one of the conceptual system VIEWS --> populates page, among other controller-related functions)
  * @required databaseServices.js, newEntryViewHandler.js
  * @used_by new-profile.html
*/ 
skillFuelApp.controller("NewEntryCtrl", ['$scope', '$upload','WriteService', 
  function($scope, $upload, WriteService) {

  // init user obj fields
  $scope.newUserName        = "";
  $scope.newUserTitle       = "";
  $scope.newUserLocation    = "";
  // init project obj fields
  $scope.projectName        = "";
  $scope.projectUrl         = "";
  $scope.projectDescription = "";

  $scope.imgURL = "";
	$scope.isloading = false;
  

  $scope.createProjectVisible = false;

  function extendObjects (obj1, obj2) {
    length1 = Object.keys(obj1).length;
    length2 = Object.keys(obj2).length;
    obj3 = obj1;
    for (var i = 0; i <= length2-1; i++) {
      obj3[length1 + i] = obj2 [i];  // adds elements of obj2 to obj1 without overwriting  
    };
    return obj3;
  }

  $scope.newEntry = function() {
    console.log(Object.keys($scope.skills.needs ));
    console.log(Object.keys($scope.projectNeeds));
    userNeeds = extendObjects($scope.skills.needs, $scope.projectNeeds);
    userKnows = extendObjects($scope.skills.knows, $scope.projectKnows);
    console.log(Object.keys(userNeeds));
    console.log(Object.keys($scope.skills.needs ));


    // creates object with new info from form
    newEntryObj = {
      'name':     $scope.newUserName,
      'title':    $scope.newUserTitle,
      'location': $scope.newUserLocation,
      'needs': $scope.skills.needs,
      'knows': $scope.skills.knows,
      'needsAllNames': userNeeds,
      'knowsAllNames': userKnows,
			'imgURL': $scope.imgURL ,
      'project':{  
            'name': $scope.projectName,
            'url': $scope.projectUrl,
            'description': $scope.projectDescription,
            'pics': {},//$scope.projectPics,
            'needs': $scope.projectNeeds,
            'knows': $scope.projectKnows 
            }       
    };
    // requests user creation by the service
    WriteService.newEntry(newEntryObj);
    console.log("new entry sent to Database");

    // cleans variables to be used by the next profile creation (provides submition feedback also)
    // because it is a "view issue", we keep it here and not in the service
    $scope.skills.needs       = [];
    $scope.skills.knows       = [];
    $scope.projectNeeds       = [];
    $scope.projectKnows       = [];
    $scope.newUserName        = "";
    $scope.newUserTitle       = "";
    $scope.newUserLocation    = "";
    $scope.projectName        = "";
    $scope.projectUrl         = "";
    $scope.projectDescription = "";
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