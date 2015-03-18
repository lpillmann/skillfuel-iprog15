/** 
  * @desc populates the view and gathers data from inputs (one of the conceptual system VIEWS --> populates page, among other controller-related functions)
  * @required databaseServices.js, newEntryViewHandler.js
  * @used_by new-profile.html
*/ 
skillFuelApp.controller("NewEntryCtrl", ['$scope', 'NewEntryViewHandler','WriteService', 
  function($scope, NewEntryViewHandler, WriteService) {
  
  // Used by Search view
  $scope.getUsers = function () {
    return NewEntryViewHandler.getUsers();
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
    NewEntryViewHandler.addSkill(skillType, skill);
    // clears input field depending on skillType
    if (skillType === "need")
      $scope.newUserNeed = ""; 
    else if (skillType === "know") 
      $scope.newUserKnow = "";
  };

  $scope.removeSkill = function (skillType, skill) {
    NewEntryViewHandler.removeSkill(skillType, skill);
  }

  $scope.getSkillsArray = function (skillType) {
    return NewEntryViewHandler.getSkillsArray(skillType);
  }

  $scope.emptySkillsArray = function (skillType) {
    return NewEntryViewHandler.emptySkillsArray(skillType);
  }

  $scope.newEntry = function() {
    // creates object with new info from form
    console.log("add user from scope");
    newEntryObj = {
      'name':     $scope.newUserName,
      'title':    $scope.newUserTitle,
      'location': $scope.newUserLocation,
      'needs': $scope.skills.needs,
      'knows': $scope.skills.knows,
        
        'project':[{
        
            'name': $scope.projectName,
            'url': $scope.projectUrl,
            'description': $scope.projectDesrption,
            'pics': $scope.projectPics,
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

}]);