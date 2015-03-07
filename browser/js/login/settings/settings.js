'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('userSettings', {
		url: '/settings',
		controller: 'SettingCtrl',
		templateUrl: 'js/login/settings/settings.html'
	});
});

app.controller('SettingCtrl', function($scope, CurrentFactory) {
	$scope.user = CurrentFactory.current.user;
	$scope.changedUser = CurrentFactory.cloneCurrentUser();

	$scope.revertChanges = function() {
		$scope.changedUser = CurrentFactory.cloneCurrentUser();
		$scope.userSettingForm.$setPristine();
	};

	$scope.submitChanges(changedUser) {
		
	}
});