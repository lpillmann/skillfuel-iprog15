skillFuelApp.controller('BannerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.getMyId = function(){
		//return "test";
		return $rootScope.myid;
	};
	
	$scope.myid = 3;

}]);