

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  //this._storage.set(index, v);
  var objInsert = this._storage.get(index);
  if(objInsert !== undefined){
  	objInsert[k] = v;
  } else {
    objInsert = {};
  	objInsert[k] = v;
  }
  this._storage.set(index, objInsert);
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var objRetrieve = this._storage.get(index);
  return objRetrieve[k];

};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var objRemove = this._storage.get(index);
  delete objRemove[k];
  this._storage.set(index, objRemove);

};



/*
 * Complexity: What is the time complexity of the above functions?
 * Constant time: O(1) for all functions
 */


