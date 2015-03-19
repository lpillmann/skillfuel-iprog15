skillFuelApp.controller('FileUploadCtrl', ['$scope', '$upload', function ($scope, $upload) {
	$scope.$watch('files', function () {
			$scope.upload($scope.files);
	});

	$scope.upload = function (files) {
			if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
							var file = files[i]
							var fileReader = new FileReader();
							fileReader.readAsArrayBuffer(file);
							fileReader.onload = function(e) {
									$upload.http({
											url: 'https://api.imgur.com/3/image',
											//headers: {'Content-Type': file.type},
											headers: {
												'Content-Type': file.type,
												'Authorization': 'Client-ID 4858d2a8e5879a4'},
											data: e.target.result
									}).then(function(response) {
											console.log('success, maybe? response: ' + JSON.stringify(response));//success;
									}, null, function(evt) {
											$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
									});
							}
							
							
							/*
							var file = files[i];
							$upload.http({
									url: 'upload/url',
									fields: {'username': $scope.username},
									file: file
							}).progress(function (evt) {
									var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
									console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
							}).success(function (data, status, headers, config) {
									console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
							
							
							});
							*/
					}
			}
	};
}]);

    
