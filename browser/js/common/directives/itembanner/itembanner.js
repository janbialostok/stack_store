'use strict';

app.directive('itemBanner', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/itembanner/itembanner.html',
		scope: {
			data: '='
		},
		link: function(scope, elem, attr) {

			var index = 0;
			var step = 3;
			scope.active = scope.data.slice(index, step);
			index += step;
			scope.extra = [];

			while (scope.data.length) {
				scope.extra.push(scope.data.slice(index,step));
				index += step;
			}
		}
	};
});