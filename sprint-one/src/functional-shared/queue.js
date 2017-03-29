var Queue = function() {
	var someInstance = {};
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  	someInstance.storage = {};
  	someInstance.count = 0;
  	someInstance.cursor = 1;
  	someInstance.tail = 1;

  	_.extend(someInstance, queueMethods);

  	return someInstance;
};

var queueMethods = {
	enqueue: function(value){
		this.storage[this.tail] = value;
		this.tail++;
		this.count++;

	},

	dequeue: function(){
		if(this.count > 0){
			var poppedItem = this.storage[this.cursor];
			this.cursor++;
			this.count--;
			return poppedItem;
		} 
	},

	size: function(){
		return this.count;
	}
};


