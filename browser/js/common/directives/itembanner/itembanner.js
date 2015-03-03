'use strict';

app.directive('itemBanner', function($window) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/itembanner/itembanner.html',
		scope: {
			data: '=',
			title: '@'
		},
		link: function(scope, elem, attr) {
			scope.extra = [];
			scope.active = [];
			updateBanner();

			function updateBanner() {
				var width = window.innerWidth;

				if (width > 1200) splitData(4);
				else if (width > 992) splitData(3);
				else if (width > 768) splitData(2);
				else splitData(1);
			}

			function splitData(stepSize) {
				console.log(stepSize);
				var index = 0;
				scope.extra = [];
				scope.active = scope.data.slice(index, stepSize);
				index += stepSize;
				while (index < scope.data.length) {
					scope.extra.push(scope.data.slice(index,index + stepSize));
					index += stepSize;
				}
			}

			$(window).resize(function() {
				updateBanner();
				scope.$digest();
			});
		}
	};
});