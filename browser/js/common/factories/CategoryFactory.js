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

	var tops = {
		long_sleeve: "end",
		short_sleeve: "end"
	}
	var bottoms= {
		skinny: "end",
		slim: "end",
		straight: "end",
		boot: "end",
		relaxed: "end"
	}

	var gender = {
		tops: tops,
		bottoms: bottoms
	}

	factory.categories_asObj = {
		male: gender,
		female: gender,
		children: gender
	};

	factory.categories_asArrLike = objToArrLike(factory.categories_asObj);

	factory.getChildrenFor = function(key) {
		function rec_getChildren(node) {
			if (node.name == key) return node.children;
			else {
				for (var i = node.children.length - 1; i >= 0; i--) {
					var found = rec_getChildren(node.children[i]);
					if (found) return found;
				};
			}
		}
		for (var i = factory.categories_asArrLike.length - 1; i >= 0; i--) {
			var found = rec_getChildren(factory.categories_asArrLike[i]);
			if (found) return found.map(function(node) {
				return node.name;
			});
		};
	};

	factory.getFirstLevelOptions = function() {
		return Object.keys(factory.categories_asObj);
	};

	return factory;
});