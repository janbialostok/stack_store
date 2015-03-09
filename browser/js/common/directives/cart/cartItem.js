'use strict';

app.directive('cartItem', function (CurrentFactory, CartFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/cart/cartItem.html',
		scope: {
			item: '=',
			cart: '='
		},
		link: function(scope, elem, attr){

		}
	};
});