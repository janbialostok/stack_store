'use strict';

app.directive('item', function() {
    return {
		restrict: 'E',
		templateUrl: 'js/common/directives/item/item.html',
		scope: {
			data: '='
		},
		link: function(scope, elem, attr) {	    

			var repeat = function(num) {
				var newArr = [];

				for (var i = 0; i < num; i++) {
					newArr.push(i);
				}

				return newArr;
			};

			scope.fullStars = repeat(Math.floor(scope.data.avgReview));
			scope.emptyStars = repeat(Math.floor(5-scope.data.avgReview));
			scope.hasHalfStar = scope.fullStars.length + scope.emptyStars.length !== 5;	
		}
	};
});
