// TODO: description 

/** 
  * @desc ?
  * @required ?
  * @used_by ?
*/ 

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
			
			// Added 03-18 because for some reason i can only access $scope.users once inside openNeedsKnows()
			var localUsers = $scope.users;

			$scope.openNeedsKnows = function (index, needs, knows) {
				console.log(needs);
				ngDialog.open({ 
					template: 'needsKnowsDialog', 
					controller: 'InsideCtrl', 
					data: {
						title: localUsers[index].title,
						username: localUsers[index].name,
						needs: needs,
						knows: knows
						} 
				});
			};

			$scope.openProjects = function () {
				ngDialog.open({ 
					template: 'projectsDialog', 
					controller: 'InsideCtrl', 
					data: {foo: 'some data'} });
			};

			$scope.sendMessage = function () {
				ngDialog.open({ 
					template: 'messageDialog', 
					controller: 'InsideCtrl', 
					data: {foo: 'some data'} });
			};
			
			$scope.submitProfile = function () {
				ngDialog.open({ 
					template: 'submitProfileDialog', 
					controller: 'InsideCtrl', 
					data: {foo: 'some data' } });
			};
			
			$rootScope.$watch('myid', function() {
				$scope.myid = $rootScope.myid;
			});
			
			/*
			$scope.getMyId = function() {
				return $rootScope.myid;
			};
			*/

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