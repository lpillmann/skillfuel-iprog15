/**
 * Created by Sandeep on 16/10/14.
 */
skillFuelApp.controller('TagController',['$scope',function($scope){
    $scope.$watchCollection('data.tags',function(val){
        console.log(val);
    });
}]);