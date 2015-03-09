'use strict';

app.directive('itemBanner', function($window) {
    return {
	restrict: 'E',
	templateUrl: 'js/common/directives/itembanner/itembanner.html',
	scope: {
	    data: '=',
	    title: '@',
	    name: "@"
	},
	link: function($scope, elem, attr) {
	    function updateBanner() {
		var width = window.innerWidth;
		
		if (width > 1200) splitData(4);
		else if (width > 992) splitData(3);
		else if (width > 768) splitData(2);
		else splitData(1);
	    }
	    
	    function splitData(stepSize) {
		$scope.allSlides = [];		
		var currentIndex = 0;
		
		if ($scope.data) {
		    while (currentIndex < 21) {
			var itemRow = [];
			
			for (var i = 0; i < stepSize; i++) {
			    if (currentIndex >= 21) break;

			    itemRow.push($scope.data[currentIndex]);
			    currentIndex++;
			}
			
			$scope.allSlides.push(itemRow);
		    }   
		}
	    }

	    $(window).resize(function() {
		updateBanner();
		$scope.$digest();
	    });

	    updateBanner();
	}
    };
});
