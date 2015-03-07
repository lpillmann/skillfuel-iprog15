// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
skillFuelApp.controller('SkillFuelCtrl', function ($scope,SkillFuel) {

  $scope.numberOfGuests = SkillFuel.getNumberOfGuests();

  $scope.setNumberOfGuests = function(number){
    SkillFuel.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return SkillFuel.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});