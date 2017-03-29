var Queue = function() {

	this.storage = {};
	this.count = 0;
	this.cursor = 1;
	this.tail = 1;
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
};

Queue.prototype.enqueue = function(value){
	this.storage[this.tail] = value;
	this.tail++;
	this.count++;
};

Queue.prototype.dequeue = function(){

	if(this.count > 0){
		var poppedItem = this.storage[this.cursor];
		delete this.storage[this.cursor];
		this.cursor++;
		this.count--;
		return poppedItem;
	}
};

Queue.prototype.size = function(){
	return this.count;
};


