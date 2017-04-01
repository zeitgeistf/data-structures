var BinarySearchTree = function(value) {

	var bst = {};
	bst.value = value;

	bst.left = null;
	bst.right = null;


	bst.insert = function(newValue){

		if (newValue < this.value) {
			if (this.left === null){
				this.left = BinarySearchTree(newValue);

			} else {
				this.left.insert(newValue);

			}
		} else {

			if (this.right === null){
				this.right = BinarySearchTree(newValue);

			} else{
				this.right.insert(newValue);

			}

		}

	};

	bst.contains = function(target){
		
		if(target === this.value){
			return true;

		} else if(target < this.value){

			if(this.left === null){
				return false;

			} else {
				// now checking left which is an instance of tree
				return this.left.contains(target);

			}

		} else {

			if(this.right === null){
				return false;

			} else {
				// now checking left which is an instance of tree
				return this.right.contains(target);
			}
		}
	};

	bst.depthFirstLog = function(cb){

		cb(this.value);

		if(this.left !== null){
			this.left.depthFirstLog(cb);
		}

		if(this.right !== null){
			this.right.depthFirstLog(cb);
		}

	};

	bst.print = function() {

		var depth = 0;
		var printObj = [['[' + this.value + ']']];

		var addTrees = [this.left, this.right];

		while (addTrees.some(x => x !== null)) {
			depth++;
			var addNodes = [];
			addTrees.forEach(function(x) {
				if (x === null) {
					addNodes.push(' -- ');
				} else {
					var space = '';
					if (x.value < 10) space = ' ';
					addNodes.push('[' + space + x.value + ']');
				}
			});

			var lines = [];
			addNodes.forEach(function (x, i, array) {
				(i % 2) === 0 ? lines.push('  / ') : lines.push(' \\  ');
			});

			printObj.push(lines);
			printObj.push(addNodes);

			var newChildren = [];
			addTrees.forEach(function (x) {
				if( x === null ) {
					newChildren.push(null);
					newChildren.push(null);
				} else {
					newChildren.push(x.left);
					newChildren.push(x.right);
				}
			});

			addTrees = newChildren;

		}

		var length = Math.pow(2, depth);

		printObj.forEach(x => {
			var xCount = x.length;
			var spaces = 4 * (length - xCount) / (xCount + 1);
			var spacing = '';
			for (var i = 0; i < spaces; i++) {
				spacing += ' ';
			}
			var newX = [];
			x.forEach(y => {
				newX.push(spacing);
				newX.push(y);
			});
			newX.push(spacing);

			console.log(newX.join(''));
		});// console.log(x.join('  ')));


	}

	return bst;

};


/*
 * Complexity: What is the time complexity of the above functions?
 * Liner time: O(n) for all functions
 */
