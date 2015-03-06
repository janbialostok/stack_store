'use strict';
app.directive('reviewPanel', function (ReviewFactory, CurrentFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/reviews/reviewPanel.html',
		link: function (scope, elem, attr){
			scope.currentUser = CurrentFactory.current.user;
			scope.submitReview = function (review, itemid){
				review.itemId = itemid;
				review.userId = scope.currentUser._id;
				ReviewFactory.submitReview(review).then(function (res){
					console.log(res);
				});	
			};
		}
	};
});

app.directive('review', function (){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/reviews/reviews.html',
		scope: {
			review: '='
		},
		link: function (scope, elem, attr){
		}
	};
});