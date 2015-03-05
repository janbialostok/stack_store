'use strict';

app.directive('navBar', function(loginFactory, $state, CurrentFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/navbar/navBar.html',
		scope: {},
		link: function(scope, elem, attr) {
			scope.current = CurrentFactory.current;

			scope.logout = function() {
				loginFactory.logout().then(function() {
					$state.go('home');
				});
			};

			scope.test = function() {
				CurrentFactory.getCurrentUser();
			};
		}
	};
});