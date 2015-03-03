'use strict';

app.directive('itemBanner', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/itembanner/itembanner.html',
		scope: {
			data: '='
		},
		link: function(scope, elem, attr) {
			scope.extra = [];
			scope.active = [];

			function splitData(stepSize) {
				var index = 0;
				scope.extra = [];
				scope.active = scope.data.slice(index, stepSize);
				index += stepSize;

				while (index < scope.data.length) {
					scope.extra.push(scope.data.slice(index,stepSize));
					index += stepSize;
				}
			}

			splitData(4);
		}
	};
});