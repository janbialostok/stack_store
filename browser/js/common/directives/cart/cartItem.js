'use strict';

app.directive('cartItem', function (CurrentFactory, CartFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/cart/cartItem.html',
		scope: {
			item: '='
		},
		link: function(scope, elem, attr){
			
		}
	};
});