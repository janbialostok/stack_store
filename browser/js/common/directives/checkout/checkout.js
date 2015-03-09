'use strict';

app.directive('checkoutItem', function (CurrentFactory, CartFactory){
	return {
		restrict: 'EA',
		templateUrl: 'js/common/directives/checkout/checkoutItem.html',
		scope: {
			item: '=myElement'
		},
		link: function(scope, elem, attr){

		}
	};
});