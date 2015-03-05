'use strict';

app.directive('navBar', function(loginFactory, $state, CurrentFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/navbar/navBar.html',
		scope: {},
		link: function(scope, elem, attr) {
			scope.current = CurrentFactory.current;

			scope.cartNum = 0;

			scope.$watch('current.user', function(user) {
				if (user && user.hasOwnProperty('cart') && user.cart.length) {
					scope.cartNum = user.cart[0].items.length;
				} else scope.cartNum = 0;
			});

			scope.logout = function() {
				loginFactory.logout().then(function() {
					$state.go('home');
				});
			};
		}
	};
});