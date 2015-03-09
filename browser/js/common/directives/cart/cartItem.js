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
			// scope.editQuantity = function (item){
			// 	if (item.quantity === 0) {
			// 		scope.deleteItem(item);
			// 	}
			// 	else {
			// 		CartFactory.updateCart(scope.cart, item).then(function (updated){
			// 			scope.cart = updated;
			// 		});
			// 	}
			// };
			// scope.deleteItem = function (item){
			// 	CartFactory.deleteItem(scope.cart, item).then(function (updated){
			// 		scope.cart = updated;
			// 	});
			// };
		}
	};
});