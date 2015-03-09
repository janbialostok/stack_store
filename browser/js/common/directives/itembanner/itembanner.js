'use strict';
angular.module("ui-carousel", ["ui.bootstrap"]);
angular.module("ui-carousel").controller("CarouselControl", function($scope) {
    $scope.myInterval = 0;
    var slides = $scope.slides = [];

    $scope.addSlide() = function() {
	slides.push();
    };
});

app.directive('itemBanner', function($window) {
    return {
	restrict: 'E',
	templateUrl: 'js/common/directives/itembanner/itembanner.html',
	scope: {
	    data: '=',
	    title: '@',
	    name: "@"
	},
	link: function(scope, elem, attr) {
	    function updateBanner() {
		var width = window.innerWidth;
		
		if (width > 1200) splitData(4);
		else if (width > 992) splitData(3);
		else if (width > 768) splitData(2);
		else splitData(1);
	    }
	    
	    function splitData(stepSize) {
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
		scope.$apply();
		scope.$broadcast("Resized");
	    });

	    scope.extra = [];
	    scope.active = [];
	    updateBanner();
	}
    };
});

// app.directive('itemBanner', function($window) {
//     return {
// 	restrict: 'E',
// 	templateUrl: 'js/common/directives/itembanner/itembanner.html',
// 	scope: {
// 	    data: '=',
// 	    title: '@',
// 	    name: "@"
// 	},
// 	link: function(scope, elem, attr) {
// 	    function updateBanner() {
// 		var width = window.innerWidth;
		
// 		if (width > 1200) splitData(4);
// 		else if (width > 992) splitData(3);
// 		else if (width > 768) splitData(2);
// 		else splitData(1);
// 	    }
	    
// 	    function splitData(stepSize) {
// 		var index = 0;
// 		scope.extra = [];
// 		scope.active = scope.data.slice(index, stepSize);
// 		index += stepSize;
// 		while (index < scope.data.length) {
// 		    scope.extra.push(scope.data.slice(index,index + stepSize));
// 		    index += stepSize;
// 		}
// 	    }

// 	    $(window).resize(function() {
// 		updateBanner();
// 		scope.$apply();
// 		scope.$broadcast("Resized");
// 	    });

// 	    scope.extra = [];
// 	    scope.active = [];
// 	    updateBanner();
// 	}
//     };
// });
