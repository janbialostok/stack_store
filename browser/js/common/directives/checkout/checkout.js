'use strict';

app.directive('checkoutItem', function (CurrentFactory, CartFactory, UserFactory, ItemFactory){
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
				var items;
				if (scope.saveAddressMarker){
					UserFactory.saveAddressOnUser(user, address);
				};
				CartFactory.saveAddressOnCart(user.cart, address).then(function (cart){
					return cart;
				}).then(function (cart){
					items = cart;
					console.log(items);
					return UserFactory.convertToOrder(user, cart);
				}).then(function (user){
					return CartFactory.clearCart(user._id);
				}).then(function(){
					return CurrentFactory.updateCurrentUser()
				}).then(function(){
					ItemFactory.updateInventory(items).then(function (res){
						console.log(res.data);
					});
				});
			}
		}
	};
});