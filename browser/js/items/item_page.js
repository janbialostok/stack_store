"use strict";

app.config(function($stateProvider) {
	$stateProvider.state('single_item', {
		url: '/item/:productId',
		controller: 'ItemCtrl',
		templateUrl: 'js/items/item_page.html'
	});
});

app.controller('ItemCtrl', function($scope, $state, $stateParams, ItemFactory, CurrentFactory) {
	ItemFactory.getItem($stateParams.productId).then(function (data){
		$scope.item = data;
		$scope.showDescription = $scope.item.description !== "";
		return ItemFactory.getUser(data._id, data.sellerID);
	}).then(function (user){
		$scope.item.sellerName = user.name;
	}).then(function() {
		return ItemFactory.getReviews($stateParams.productId);
	}).then(function(reviews) {
		reviews.forEach(function(review) {
			ItemFactory.getReviewUser(review.userId).then(function(user) {
				review.username = user.name;
			});
		});
		$scope.item.reviews = reviews;
	});
		

		// 	ItemFactory.getReviews($stateParams.productId).then(function (reviews){
		// 		reviews.forEach(function(review) {
		// 			ItemFactory.getReviewUser(review.userId).then(function(res) {
		// 				review.username = res.name;

		// 			})
		// 		})

		// 		$scope.item.reviews = reviews;
		// 	});
		// });





	$scope.addToCart = function(itemAdd) {
		var item = {
		 	userId : CurrentFactory.current.user._id,
		 	itemId : $stateParams.productId,
		 	quantity : itemAdd.quantity
		};
		ItemFactory.sendItemToCart(item).then(function (data){
			console.log(data.cart);
		});
	};
	
});