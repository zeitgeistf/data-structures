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

	return bst;

};


/*
 * Complexity: What is the time complexity of the above functions?
 * Liner time: O(n) for all functions
 */
