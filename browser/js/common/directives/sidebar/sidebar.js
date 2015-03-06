'use strict';

app.directive('sideBar', function(CategoryFactory){
    return {
		restrict: 'E',
		templateUrl: 'js/common/directives/sidebar/sidebar.html',
		link: function($scope, elem, attr){
			$scope.categories = CategoryFactory.categories_asArrLike;
		}
	};
});



app.directive('menuList', function(){
    return {
	restrict: 'E',
	templateUrl: 'js/common/directives/sidebar/menuList.html',
	link: function($scope, elem, attr){
	    $scope.findCategory = function(val){
		console.log(val.toLowerCase());
	    };
	}
    };
});

app.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function ($scope, elem, attr) {
            elem.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
});

// app.factory('SideBarFactory', function(){
//     return {
// 	male: {
// 	    text: "Male",
// 	    tops: {
// 		long_sleeve: {
// 		    text: "Long Sleeve",
// 		    qValue: "male long sleeve"
// 		},
// 		short_sleeve: {
// 		    text: "Short Sleeve",
// 		    qValue: "male short sleeve"
// 		}
// 	    },
// 	    bottoms: {
// 		skinny: {
// 		    text: "Skinny",
// 		    qValue: "male skinny"
// 		},
// 		slim: {
// 		    text: "Slim",
// 		    qValue: "male slim"
// 		},
// 		straight: {
// 		    text: "Straight",
// 		    qValue: "male straight"
// 		},
// 		boot: {
// 		    text: "Boot Cut",
// 		    qValue: "male boot"
// 		},
// 		relaxed: {
// 		    text: "Relaxed",
// 		    qValue: "male relaxed"
// 		}
// 	    }
// 	},
// 	female: {
// 	    text: "Female",
// 	    tops: {
// 		long_sleeve: {
// 		    text: "Long Sleeve",
// 		    qValue: "female long sleeve"
// 		},
// 		short_sleeve: {
// 		    text: "Short Sleeve",
// 		    qValue: "female short sleeve"
// 		}
// 	    },
// 	    bottoms: {
// 		skinny: {
// 		    text: "Skinny",
// 		    qValue: "female skinny"
// 		},
// 		slim: {
// 		    text: "Slim",
// 		    qValue: "female slim"
// 		},
// 		straight: {
// 		    text: "Straight",
// 		    qValue: "female straight"
// 		},
// 		boot: {
// 		    text: "Boot Cut",
// 		    qValue: "female boot"
// 		},
// 		relaxed: {
// 		    text: "Relaxed",
// 		    qValue: "female relaxed"
// 		}
// 	    }
// 	},
// 	children: {
// 	    text: "Children",
// 	    tops: {
// 		long_sleeve: {
// 		    text: "Long Sleeve",
// 		    qValue: "children long sleeve"
// 		},
// 		short_sleeve: {
// 		    text: "Short Sleeve",
// 		    qValue: "children short sleeve"
// 		}
// 	    },
// 	    bottoms: {
// 		skinny: {
// 		    text: "Skinny",
// 		    qValue: "children skinny"
// 		},
// 		slim: {
// 		    text: "Slim",
// 		    qValue: "children slim"
// 		},
// 		straight: {
// 		    text: "Straight",
// 		    qValue: "children straight"
// 		},
// 		boot: {
// 		    text: "Boot Cut",
// 		    qValue: "children boot"
// 		},
// 		relaxed: {
// 		    text: "Relaxed",
// 		    qValue: "children relaxed"
// 		}
// 	    }
// 	}
//     };
// });
