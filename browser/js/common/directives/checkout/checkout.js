'use strict';


app.directive('checkoutItem', function (CurrentFactory, CartFactory, UserFactory, CreditFactory, ItemFactory){
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

			scope.submitOrder = function (){
				var items;
				var billing = scope.billing;
				var address = scope.address;
				if (scope.sameShipping){
					billing = address;
				};
				if (scope.saveAddressMarker){
					UserFactory.saveAddressOnUser(user, address);
				};
				CartFactory.saveAddressOnCart(user.cart, address, billing).then(function (cart){
					return cart;
				}).then(function (cart){
					items = cart.items;
					return UserFactory.convertToOrder(user, cart);
				}).then(function (user){
					return CartFactory.clearCart(user._id);
				}).then(function(){
					return CurrentFactory.updateCurrentUser()
				}).then(function(){
					items.forEach(function (item){
						ItemFactory.updateInventory(item.itemId, item.quantity);
					});
				});
			}
		}
	};
});