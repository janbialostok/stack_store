"use strict";

app.config(function($stateProvider) {
    $stateProvider.state('single_item', {
		url: '/item/:productId',
		controller: 'ItemCtrl',
		templateUrl: 'js/items/item_page.html'
    });
});

app.controller('ItemCtrl', function($scope, $state, $stateParams, $timeout, ItemFactory, ReviewFactory, UserFactory, CurrentFactory, CartFactory, loginFactory) {
    var populatePage = function () {
    	ItemFactory.getItem($stateParams.productId).then(function (data){
			$scope.item = data;
			$scope.showDescription = $scope.item.description !== "";
			return UserFactory.getUserById(data.sellerID);
	    }).then(function (user){
			$scope.item.sellerName = user.name;
			return ReviewFactory.getReviewsForItem($stateParams.productId);
	    }).then(function(reviews) {
			reviews.forEach(function(review) {
				UserFactory.getUserById(review.userId).then(function(user) {
					review.username = user.name;
				});

				var numFullStars = Math.floor(review.rating);
				var numEmptyStars = Math.floor(5-review.rating);

				review.fullStars = [];
				review.emptyStars = [];
				
				for (var i = 1; i <= 5; i++) {
					if (numFullStars !== 0) {
						review.fullStars.push(i);
						numFullStars--;
					} else if (numEmptyStars !== 0) {
						review.emptyStars.push(i);
						numEmptyStars--;
					}
				};
			});
			$scope.item.reviews = reviews;
	    });
	};

	populatePage();
	$scope.showAddMessage = false;
    $scope.addToCart = function(itemAdd) {
		function addItemThenClear() {
			CartFactory.addItemToCart(
				itemAdd.quantity,
				$stateParams.productId,
				CurrentFactory.current.user._id
			).then(function(user) {
				CurrentFactory.current.user.cart = user.cart;
				itemAdd.quantity = null;
				CurrentFactory.updateCurrentUser().then(function(){
					$scope.showAddMessage = true;
					$timeout(function(){$scope.showAddMessage = false}, 3000);
				});
			});	
		}

		if (!CurrentFactory.current.user._id) {
			UserFactory.makeUnauthorizedUser().then(addItemThenClear);
		} else addItemThenClear();
    };
    $scope.submitReview = function (review, itemid){
		review.itemId = itemid;
		review.userId = CurrentFactory.current.user._id;
		ReviewFactory.submitReview(review).then(function (){
			populatePage();
			review.comment = "";
			review.rating = "";
		});
	};

});
