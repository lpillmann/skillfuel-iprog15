skillFuelApp.controller('BannerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.getMyId = function(){
		return $rootScope.myid;
	};
}]);