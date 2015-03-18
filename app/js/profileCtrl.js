// Dinner controller that we use whenever we want to display detailed
// information for one dish
skillFuelApp.controller('ProfileCtrl', function ($scope,$routeParams,SkillFuel) {
  
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  
});





skillFuelApp.directive('createUserProject', function(){
	
	return{
		restrict: 'E',
		templateUrl: 'partials/new-profile-projects.html', // current root is at from index.html
		controller:function(){

			this.addProject = false;

			this.setAddProject = function(value) {

				this.addProject = value;

			};

			this.isAddProject = function() {
			
				return this.addProject;
			};
		},

		controllerAs: 'projectCtrl'

	};
});
