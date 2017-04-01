var Tree = function(value) {

  var newTree = Object.create(treeMethods);
  newTree.value = value;

  // your code here
  newTree.children = [];  // fix me

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) { 

	// create a new tree
	var newChildTree = new Tree(value);
	// you add the new tree to its parent tree's children array
	this.children.push(newChildTree);

};



treeMethods.contains = function(target) {

	var isFound = false;

	var containsInner = function(tree) {

		// compare if the target matches with the value of current tree
		if (tree.value === target){
			isFound = true;
		}

		if (!isFound) {
			tree.children.forEach(function(element){
				//this.contains(element);
				containsInner(element);
			});			
		}

		// go down to the children array, loop through and compare with each
		// child's value

	}

	containsInner(this);

	return isFound;

};

treeMethods.print = function() {

};


/*
 * Complexity: What is the time complexity of the above functions?
 */
