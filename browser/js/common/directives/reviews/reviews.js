'use strict';
app.directive('reviewPanel', function (ReviewFactory, CurrentFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/reviews/reviewPanel.html',
		link: function (scope, elem, attr){
			scope.currentUser = CurrentFactory.current.user.permLevel;
		}
	};
});

app.directive('review', function (){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/reviews/reviews.html',
		scope: {
			review: '='
		}
	};
});
