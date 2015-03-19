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