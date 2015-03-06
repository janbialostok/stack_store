app.directive('reviewPanel', function (){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/reviews/reviewPanel.html',
		link: function (scope, elem, attr){

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