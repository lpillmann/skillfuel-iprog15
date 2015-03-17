

		// Example of how to set default values for all dialogs
		skillFuelApp.config(['ngDialogProvider', function (ngDialogProvider) {
			ngDialogProvider.setDefaults({
				className: 'ngdialog-theme-default',
				plain: false,
				showClose: true,
				closeByDocument: true,
				closeByEscape: true,
				appendTo: false,
				preCloseCallback: function () {
					console.log('default pre-close callback');
				}
			});
		}]);

			skillFuelApp.controller('DialogCtrl', function ($scope, $rootScope, ngDialog) {
			$rootScope.jsonData = '{"foo": "bar"}';
			$rootScope.theme = 'hello!';


			$scope.open = function () {
				ngDialog.open({ template: 'firstDialogId', controller: 'InsideCtrl', data: {foo: 'some data'} });
			};

			$scope.openDefault = function () {
				ngDialog.open({
					template: 'firstDialogId',
					controller: 'InsideCtrl',
					className: 'ngdialog-theme-default'
				});
			};

			

			$rootScope.$on('ngDialog.opened', function (e, $dialog) {
				console.log('ngDialog opened: ' + $dialog.attr('id'));
			});

			$rootScope.$on('ngDialog.closed', function (e, $dialog) {
				console.log('ngDialog closed: ' + $dialog.attr('id'));
			});

			$rootScope.$on('ngDialog.closing', function (e, $dialog) {
				console.log('ngDialog closing: ' + $dialog.attr('id'));
			});
		});

		skillFuelApp.controller('InsideCtrl', function ($scope, ngDialog) {
			$scope.dialogModel = {
				message : 'message from passed scope'
			};
			$scope.openSecond = function () {
				ngDialog.open({
					template: '<h3><a href="" ng-click="closeSecond()">Close all by click here!</a></h3>',
					plain: true,
					closeByEscape: false,
					controller: 'SecondModalCtrl'
				});
			};
		});

		skillFuelApp.controller('SecondModalCtrl', function ($scope, ngDialog) {
			$scope.closeSecond = function () {
				ngDialog.close();
			};
		});