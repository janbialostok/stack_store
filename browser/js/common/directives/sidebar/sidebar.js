'use strict';

app.directive('sideBar', function(SideBarFactory){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/sidebar/sidebar.html',
		link: function($scope, elem, attr){
			$scope.sidebars = [
				{ 
					text: SideBarFactory.male.text,
					qValue: SideBarFactory.male.text,
					topTypes: [],
					bottomTypes: []
				},
				{
					text: SideBarFactory.female.text,
					qValue: SideBarFactory.female.text,
					topTypes: [],
					bottomTypes: []
				},
				{
					text: SideBarFactory.children.text,
					qValue: SideBarFactory.children.text,
					topTypes: [],
					bottomTypes: []
				}
			];

			for (var key in SideBarFactory.male.tops){
				$scope.sidebars[0].topTypes.push(SideBarFactory.male.tops[key]);
				$scope.sidebars[1].topTypes.push(SideBarFactory.female.tops[key]);
				$scope.sidebars[2].topTypes.push(SideBarFactory.children.tops[key]);
			};
			for (var key in SideBarFactory.male.bottoms){
				$scope.sidebars[0].bottomTypes.push(SideBarFactory.male.bottoms[key]);
				$scope.sidebars[1].bottomTypes.push(SideBarFactory.female.bottoms[key]);
				$scope.sidebars[2].bottomTypes.push(SideBarFactory.children.bottoms[key]);
			};
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

app.factory('SideBarFactory', function(){
	return {
		male: {
			text: "Male",
			tops: {
				long_sleve: {
					text: "Long Sleve",
					qValue: "male long sleve",
					sizes: {
						small: {
							text: "Small",
							qValue: "male long sleve small"
						},
						medium: {
							text: "Medium",
							qValue: "male long sleve medium"
						},
						large: {
							text: "Large",
							qValue: "male long sleve large"
						}
					}
				},
				short_sleve: {
					text: "Short Sleve",
					qValue: "male short sleve",
					sizes: {
						small: {
							text: "Small",
							qValue: "male short sleve small"
						},
						medium: {
							text: "Medium",
							qValue: "male short sleve medium"
						},
						large: {
							text: "Large",
							qValue: "male short sleve large"
						}
					}
				}
			},
			bottoms: {
				skinny: {
					text: "Skinny",
					qValue: "male skinny"
				},
				slim: {
					text: "Slim",
					qValue: "male slim"
				},
				straight: {
					text: "Straight",
					qValue: "male straight"
				},
				boot: {
					text: "Boot Cut",
					qValue: "male boot"
				},
				relaxed: {
					text: "Relaxed",
					qValue: "male relaxed"
				}
			}
		},
		female: {
			text: "Female",
			tops: {
				long_sleve: {
					text: "Long Sleve",
					qValue: "female long sleve"
				},
				short_sleve: {
					text: "Short Sleve",
					qValue: "female short sleve"
				}
			},
			bottoms: {
				skinny: {
					text: "Skinny",
					qValue: "female skinny"
				},
				slim: {
					text: "Slim",
					qValue: "female slim"
				},
				straight: {
					text: "Straight",
					qValue: "female straight"
				},
				boot: {
					text: "Boot Cut",
					qValue: "female boot"
				},
				relaxed: {
					text: "Relaxed",
					qValue: "female relaxed"
				}
			}
		},
		children: {
			text: "Children",
			tops: {
				long_sleve: {
					text: "Long Sleve",
					qValue: "children long sleve"
				},
				short_sleve: {
					text: "Short Sleve",
					qValue: "children short sleve"
				}
			},
			bottoms: {
				skinny: {
					text: "Skinny",
					qValue: "children skinny"
				},
				slim: {
					text: "Slim",
					qValue: "children slim"
				},
				straight: {
					text: "Straight",
					qValue: "children straight"
				},
				boot: {
					text: "Boot Cut",
					qValue: "children boot"
				},
				relaxed: {
					text: "Relaxed",
					qValue: "children relaxed"
				}
			}
		}
	};
});