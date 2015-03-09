'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('manageUsers', {
		url: '/manageUsers',
		controller: 'ManageUserCtrl',
		templateUrl: 'js/superuser/manageusers/manageusers.html'
	});
});

app.controller('ManageUserCtrl', function($scope, UserFactory, CurrentFactory, $timeout) {
	$scope.current = CurrentFactory.current;
	$scope.showStatus = false;


	var getRegisteredUsers = function() {
		return UserFactory.getAllUsers({ permLevel: 'Super User' })
		.then(function(users) {
			$scope.users = users;
			return UserFactory.getAllUsers({ permLevel: 'Registered User' });
		}).then(function(users) {
			$scope.users = $scope.users.concat(users);
		});
	};

	getRegisteredUsers();


	var showStatus = function() {
		$scope.showStatus = true;
		getRegisteredUsers().then(function() {
			$timeout(function() {
				$scope.showStatus = false;
			}, 1000);
		});
	};

	$scope.resetPassword = function(userName) {
		UserFactory.getByName(userName).then(function(user) {
			return UserFactory.resetPassword(user._id);
		}).then(showStatus);
	};
	$scope.changeUser = function(userName, level) {
		UserFactory.getByName(userName).then(function(user) {
			return UserFactory.changeUserPermissions(user._id, level);
		}).then(showStatus);
	};

});