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

  this.getUsers = function() {
    return ReadService.AllUsers;
  }

  this.getTagNames = function() {
    return ReadService.AllTagNamesAsArray();
  }

  var tagNames = this.getTagNames();

  this.filterTagNames = function (typedInput) {
    return (tagNames.filter(function(value){
            return value.indexOf(typedInput)!== -1;
        }));
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