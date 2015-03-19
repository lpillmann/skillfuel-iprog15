/**  
  * @desc this service will hold functions for user interaction (conceptual system CONTROLLER --> e.g. requests changes in the MODEL)
  * examples include addSkill(), getSkillsArray(), getUsers() 
  * @required databaseServices.js 
  * @used_by newEntryCtrl.js
*/  
skillFuelApp.factory('NewEntryViewHandler',function (ReadService) {

  this.getTagNames = function() {
    return ReadService.AllTagNamesAsArray();
  }

  var tagNames = this.getTagNames();
  this.filterTagNames = function (typedInput) {
    return (tagNames.filter(function(value){
            return value.indexOf(typedInput)!== -1;
        }));
  }

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});