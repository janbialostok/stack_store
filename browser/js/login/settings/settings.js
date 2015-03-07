'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('userSettings', {
		url: '/settings',
		controller: 'SettingCtrl',
		templateUrl: 'js/login/settings/settings.html'
	});
});

app.controller('SettingCtrl', function($scope, CurrentFactory, UserFactory, $timeout) {
	$scope.changedUser = CurrentFactory.cloneCurrentUser();
	$scope.changeSuccess = false;

	$scope.revertChanges = function() {
		$scope.changedUser = CurrentFactory.cloneCurrentUser();
		$scope.userSettingForm.$setPristine();
	};

	$scope.submitChanges = function(changedUser) {
		UserFactory.updateUser(changedUser)
		.then(function(user) {
			console.log(user);
			CurrentFactory.current.user = user;
			$scope.userSettingForm.$setPristine();
			$scope.changeSuccess = true;
			$timeout(function() {
				$scope.changeSuccess = false;
			}, 1000)
		});
	};
});