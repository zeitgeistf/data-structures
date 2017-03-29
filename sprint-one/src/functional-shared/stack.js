var Stack = function() {

	var someInstance = {};
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  	someInstance.storage = {};
  	someInstance.count = 0;

  	_.extend(someInstance, stackMethods);

  	return someInstance;
};

var stackMethods = {
	push: function(value){
		this.count++;
		this.storage[this.count] = value;
	},

	pop: function(){
		if (this.count > 0) {
			var poppedItem = this.storage[this.count];
			delete this.storage[this.count];
			this.count--;
			return poppedItem; 			
		}
	},

	size: function(){
		return this.count;
	}
};



