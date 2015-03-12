// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
skillFuelApp.factory('SkillFuel',function ($resource, $firebaseObject, $firebaseArray) {
  
   var refUsers = new Firebase("https://sizzling-heat-4392.firebaseio.com/users");

  // create a synchronized array
  var users = $firebaseArray(refUsers);

  // arrays that hold the skills being added in the profile creation
  var needsArray = [];
  var knowsArray = [];

  // function to add skill in input field to temporary arrays. These arrays will later be added to the user profile in $scope.addUser()
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

   this.addUser = function(newUserObj) {
    users.$add(newUserObj);
  }

  this.getUsers = function() {
    return users;
  }

  // function to remove element from array by value  (http://stackoverflow.com/questions/3954438/remove-item-from-array-by-value)
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


  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});