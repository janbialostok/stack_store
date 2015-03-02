'use strict';

app.directive('navBar', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/navBar/navBar.html',
		scope: {
			user: '='
		}
	};
});