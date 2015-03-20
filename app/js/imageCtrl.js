
 skillFuelApp.controller('ImageCtrl', function ($scope) {

    // Set of Photos
    $scope.photos = [
        {src: '/img/project/project1.png'},
        {src: '/img/project/2.png'},
        {src: '/img/project/3.png'},
        {src: '/img/project/4.png'},
    ];

    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };
});
