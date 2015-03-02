'use strict';

app.directive('navBar', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/navbar/navBar.html',
		scope: {
			user: '='
		}
	};
});