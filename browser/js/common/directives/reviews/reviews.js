'use strict';
app.directive('reviewPanel', function (SingleItemFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/reviews/reviewPanel.html',
		link: function (scope, elem, attr){
			scope.submitReview = function (review, itemid, userid){
				if (!review.rating) review.rating = 1;
				review.userId = userid;
				review.productId = itemid;
				SingleItemFactory.submitReview(review).then(function (res){
					console.log(res);
				});	
			}
		}
	}
});

app.directive('review', function(SingleItemFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/reviews/reviews.html',
		scope: {
			review: '='
		},
		link: function (scope, elem, attr){
			SingleItemFactory.getReviewUser(scope.review.userId).then(function (res){
				scope.username = res.name;
			});
		}
	}
});