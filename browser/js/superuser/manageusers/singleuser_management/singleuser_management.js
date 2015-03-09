'use strict';

app.directive('singleManagedUser', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/superuser/manageusers/singleuser_management/singleuser_management.html',
		scope: {
			userdata: '='
		}
	};
});