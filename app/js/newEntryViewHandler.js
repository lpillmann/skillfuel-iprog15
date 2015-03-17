/**  
  * @desc this service will hold functions for user interaction (conceptual system CONTROLLER --> e.g. requests changes in the MODEL)
  * examples include addSkill(), getSkillsArray(), getUsers() 
  * @required databaseServices.js 
  * @used_by newEntryCtrl.js
*/  
skillFuelApp.factory('NewEntryViewHandler',function (ReadService) {

  // arrays that hold the skills being added in the profile creation
  var needsArray = [];
  var knowsArray = [];

  // manouver to handle outer variables and functions inside "this." functions
  that = this;

  // function to add skill in input field to temporary arrays. 
  //These arrays will later be added to the user profile in $scope.addUser()
  this.addSkill = function (skillType, skill) {
    console.log("called from service");
    switch (skillType) { // depending on the skill type, it adds the value to the proper array
      case 'need':
        needsArray.push(skill);
        //newUserNeed = ""; // clears input field
      break;
      case 'know':
        knowsArray.push(skill);
        //newUserKnow = ""; // clears input field
      break;
      default:
        alert("error 007!"); 
    };
  };

  this.removeSkill = function (skillType, skill) {
    switch (skillType) { // depending on the skill type, it adds the value to the proper array
      case 'need':
      
        needsArray.remove(skill);
        //newUserNeed = ""; // clears input field
      break;
      case 'know':
        knowsArray.remove(skill);
        //newUserKnow = ""; // clears input field
      break;
      default:
        alert("error 008!"); 
    }
  }

  this.getSkillsArray = function (skillType) {
    if (skillType === "need")
      return needsArray;
    else if (skillType === "know") 
      return knowsArray;
  }

  // clears arrays when view requests
  this.emptySkillsArray = function (skillType) {
    if (skillType === "need")
      needsArray = [];
    else if (skillType === "know") 
      knowsArray = [];
  }

  this.getUsers = function() {
    return ReadService.AllUsers;;
  }

  /*****************************************************************************************/
  /*                              Support functions                                        */
  /*****************************************************************************************/

  // function to remove element from array by value  
  //(http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value)
  Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
  };

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});