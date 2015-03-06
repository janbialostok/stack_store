'use strict';

app.factory('CategoryFactory', function() {
	var factory = {};

	var Node = function(name, parentPath) {
		this.name = name;
		this.tags = parentPath + ' ' + name;
		this.children = [];
	};

	var objToArrLike = function(obj) {
		var recurseOnNode = function(node, obj, parentPath) {
			for (var key in obj) {
				var child = new Node(key, parentPath);

				if (typeof obj[key] === 'object') {
					recurseOnNode(child, obj[key], child.tags);
				}
				node.children.push(child);
			}
		};

		var arr = [];
		for (var key in obj) {
			var node = new Node(key, '');
			if (typeof obj[key] === 'object') {
				recurseOnNode(node, obj[key], node.tags);
			}
			arr.push(node);
		}

		return arr;
	};

	factory.categories_asObj = {
		male: {
			tops: {
				long_sleeve: "male tops long_sleeve",
				short_sleeve: "male tops short_sleeve"
			},
			bottoms: {
				skinny: "male bottoms skinny",
				slim: "male bottoms slim",
				straight: "male bottoms straight",
				boot: "male bottoms boot",
				relaxed: "male bottoms relaxed"
			}
		},
		female: {
			tops: {
				long_sleeve: "female tops long_sleeve",
				short_sleeve: "female tops short_sleeve"
			},
			bottoms: {
				skinny: "female bottoms skinny",
				slim: "female bottoms slim",
				straight: "female bottoms straight",
				boot: "female bottoms boot",
				relaxed: "female bottoms relaxed"
			}
		},
		children: {
			tops: {
				long_sleeve: "children tops long_sleeve",
				short_sleeve: "children tops short_sleeve"
			},
			bottoms: {
				skinny: "children bottoms skinny",
				slim: "children bottoms slim",
				straight: "children bottoms straight",
				boot: "children bottoms boot",
				relaxed: "children bottoms relaxed"
			}
		}
	};

	// factory.categories_asObj = {
	// 	a: 'hi',
	// 	b: 'hi'
	// }

	factory.categories_asArrLike = objToArrLike(factory.categories_asObj);

	return factory;
});