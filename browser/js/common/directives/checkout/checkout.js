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
				scope.address.address1 = addressList.address1;
				scope.address.address2 = addressList.address2;
				scope.address.city = addressList.city;
				scope.address.stateProv = addressList.stateProv;
				scope.address.postalCode = addressList.postalCode;
				scope.address.phone = addressList.phone;
				scope.address.country = addressList.country;
			};
			scope.submitOrder = function (address){
				if (scope.saveAddressMarker){
					UserFactory.saveAddressOnUser(user, address).then(function (data){
					});
				}
				console.log(user.cart);
				CartFactory.saveAddressOnCart(user.cart, address).then(function (cart){
					return cart;
				}).then(function (cart){
					UserFactory.convertToOrder(user, cart).then(function (user){
						return user
					}).then(function (user){
						CartFactory.clearCart(user._id).then(function (returned){
							return returned
						}).then(function (returned){
							CurrentFactory.updateCurrentUser();
						});
					});
				});
			}
		}
	};
});