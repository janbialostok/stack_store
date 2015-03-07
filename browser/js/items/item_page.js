"use strict";

app.config(function($stateProvider) {
	$stateProvider.state('single_item', {
		url: '/item/:productId',
		controller: 'ItemCtrl',
		templateUrl: 'js/items/item_page.html'
	});
});

app.controller('ItemCtrl', function($scope, $state, $stateParams, ItemFactory, ReviewFactory, UserFactory, CurrentFactory, CartFactory, loginFactory) {
	ItemFactory.getItem($stateParams.productId).then(function (data){
		$scope.item = data;
		$scope.showDescription = $scope.item.description !== "";
		return UserFactory.getSellerId(data._id, data.sellerID);
	}).then(function (user){
		$scope.item.sellerName = user.name;
	}).then(function() {
		return ReviewFactory.getReviewsForItem($stateParams.productId);
	}).then(function(reviews) {
		reviews.forEach(function(review) {
			UserFactory.getUserById(review.userId).then(function(user) {
				review.username = user.name;
			});
		});
		$scope.item.reviews = reviews;
	});

	$scope.addToCart = function(itemAdd) {
		function addToCart() {
			console.log('current user:', CurrentFactory.current.user)
			var item = {
				userId : CurrentFactory.current.user._id,
			 	itemId : $stateParams.productId,
			 	quantity : itemAdd.quantity
			};
			CartFactory.sendItemToCart(item).then(function() {
				itemAdd.quantity = null;
				CurrentFactory.updateCurrentUser();
			});	
		}

		if (!CurrentFactory.current.user) {
			UserFactory.makeUnauthorizedUser().then(function(user) {
				return loginFactory.localLogin({username: user.name, password: 'asdf'});
			}).then(addToCart);
		} else addToCart();

	};
	
});