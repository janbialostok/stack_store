'use strict';

app.directive('navBar', function(loginFactory, $state) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/navbar/navBar.html',
		scope: {
			navcurrent: '='
		},
		link: function(scope, elem, attr) {
			scope.logout = function() {
				loginFactory.logout().then(function() {
					scope.navcurrent.user = {};
					$state.go('home');
				});
			}
		}
	};
});