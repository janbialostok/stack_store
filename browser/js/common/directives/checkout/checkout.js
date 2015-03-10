'use strict';

app.directive('checkoutItem', function (CurrentFactory, CartFactory, UserFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/checkout/checkoutItem.html',
		link: function(scope, elem, attr){
			var user = CurrentFactory.current.user;
			scope.sameShipping = false;
			scope.useShippingAsBilling = function(){
				scope.sameShipping = !scope.sameShipping;
			};
			scope.saveAddressMarker = false;
			scope.saveAddress = function(){
				scope.saveAddressMarker = !scope.saveAddressMarker;
			};
			scope.address = {};
			scope.useAddress = function (addressList){
				var addressList = JSON.parse(addressList);
				scope.address = addressList;
			};
			scope.submitOrder = function (address){
				if (scope.saveAddressMarker){
					UserFactory.saveAddressOnUser(user, address);
				};
				CartFactory.saveAddressOnCart(user.cart, address).then(function (cart){
					return cart;
				}).then(function (cart){
					return UserFactory.convertToOrder(user, cart);
				}).then(function (user){
					return CartFactory.clearCart(user._id);
				}).then(CurrentFactory.updateCurrentUser);
			}
		}
	};
});