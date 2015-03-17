// Search controller that we use whenever we have a search inputs
// and search results
skillFuelApp.controller('SearchCtrl', ['$scope', 'SkillFuel', '$firebaseObject', function ($scope,SkillFuel,$firebaseObject) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.
  $scope.userId = '';
  $scope.userSkillType = '';
  $scope.projectId = '';
  $scope.projectSkillType = '';

  // $scope.users = [];

  $scope.userTags = new Object();
  $scope.projectsTags = new Object();
    
  /*$scope.getUsers = function () {
    return SkillFuel.getUsers();
  }

  $scope.usersByTag = []; 	// dummy temporary variable for users to be searched in the new way (with Tags)
  							// QUESTION: Do we include the skills in Firabase.users.userX ? This would result in 
  							// duplicated (denormalized) data, but that's fine

  // Experimenting with Tag-based database: how to get all users with that have a tag Id as need or know
  $scope.getUsersBySkillId = function (skillType, skill) {
  	$scope.usersByTag = SkillFuel.getUsersBySkillId(skillType, skill);
  }

  $scope.users = $scope.getUsers();*/

  // $scope.getUserTags = function (userId, skillType) {
  //     return SkillFuel.getTags('users', userId, skillType);    
  // }

  // $scope.getProjectTags = function (projectId, skillType) {
  //     return SkillFuel.getTags('projects', projectId, skillType);    
  // }

  $scope.update = function () {
    // $scope.userTags = $scope.getUserTags($scope.userId, $scope.userSkillType);
    // $scope.projectTags = $scope.getProjectTags($scope.projectId, $scope.projectSkillType);
    $scope.getTags('users', $scope.userId, $scope.userSkillType);
    
  }

  

  // Cheating with Firebase directly here
  var URL = "https://skillfuel.firebaseio.com/";
  
  var tagIdsRef   = new Firebase(URL + "/tagIds");
  var tagNamesRef = new Firebase(URL + "/tagNames");
  var usersRef    = new Firebase(URL + "/users");
  var projectsRef = new Firebase(URL + "/projects");

  $scope.getTags = function (fromWhat, Id, skillType) {
    console.log("getTags called (" + fromWhat + ", " + Id + ", " + skillType + ")");
    
    // according to parameter, changes the reference 'ref' (to not to write similar function twice)
    if      (fromWhat === 'users')    {ref = usersRef}
    else if (fromWhat === 'projects') {ref = projectsRef}
    else {
      console.log("fromWhat not recognised. Stopped method before expected.");
      return;
    }

    if ((Id === null)) {
      console.log("skillType not recognised. Stopped method before expected.");
      return;
    }

    // transforms "friendly" variable skillType into the boolean used in the database
    if      (skillType === 'need') {isNeed = true}
    else if (skillType === 'know') {isNeed = false}
    else {
      console.log("isNeed not recognised. Stopped method before expected.");
      return;
    }

    refTagsRef = ref.child(Id).child('tags'); // reference to users.userX.tags
    
    var tagsArray = [];
    var tagsObj = {};
    
    /******************************************************************
      FIREBASE QUERY
      Finds tags under user, checks each one if it is the desired type.
      If it is, pushes to array to be returned.
    ******************************************************************/
    refTagsRef.on("child_added", function(snap) { 
      // 'snap' receives tags in ref.tags object
      tagIdsRef.child(snap.key()).once("value", function(snapshot) {
        // 'snapshot' receives tag information inside tagId.tag object
        // tags inside tagIds object are the actual tags (have name, userId, projectId and isNeed)
        n = snapshot.key(); // receives TagId.tagX id
        v = snapshot.val(); // receives TagId.tagX object (what's inside)
        // if the tagIds.tagX.isNeed has value as same as skillType (need/know)
        if(v.isNeed === isNeed) {
          tagsObj[n] = v.name;  // appends to the object
          console.log("Included element (" + fromWhat +") --> " + n + " : " + v.name);
          console.log("Read from object (" + fromWhat +") --> " + tagsObj[n]);
        }
      });
    });
    /*****************************************************************/
    return tagsObj;
  }

  // $scope.userTags = $scope.getTags('users', $scope.userId, $scope.userSkillType);
  // $scope.projectTags = $scope.getTags('projects', $scope.projectId, $scope.projectSkillType);

  $scope.userTags = $scope.getTags('users', 'user1', 'need');
  $scope.projectTags = $scope.getTags('projects', $scope.projectId, $scope.projectSkillType);
  
}]);