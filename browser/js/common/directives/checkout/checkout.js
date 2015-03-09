'use strict';

app.directive('checkoutItem', function (CurrentFactory, CartFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/checkout/checkoutItem.html',
		link: function(scope, elem, attr){

		}
	};
});