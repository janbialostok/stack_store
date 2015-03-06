app.directive('reviewPanel', function (){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/reviews/reviewPanel.html',
		link: function (scope, elem, attr){
			scope.submitReview = function (review, itemid, userid){
				if (!review.rating) review.rating = 1;
				review.userId = userid;
				review.productId = itemid;
				console.log(review);
			}
		}
	}
});

app.directive('review', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/reviews/reviews.html',
		scope: {
			review: '='
		},
		link: function (scope, elem, attr){

		}
	}
});