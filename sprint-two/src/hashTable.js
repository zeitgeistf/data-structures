

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._count = 0;
};



HashTable.prototype.insert = function(k, v) {

  var index = getIndexBelowMaxForKey(k, this._limit);
  //this._storage.set(index, v);
  var objInsert = this._storage.get(index);

  if (objInsert !== undefined){
    if (objInsert.some(function(tuple){ return tuple[0] === k; })) {

      for (var i = 0; i < objInsert.length; i++){
        if (objInsert[i][0] === k){
          objInsert[i] = [k, v];
          break;
        }
      }
    } else {
  	 objInsert.push([k,v]);
     this._count++;  
    }

  } else {
    objInsert = [[k,v]];
    this._count++;
  }
  this._storage.set(index, objInsert);

  // resize here
  if (this._count > (0.75 * this._limit)){

    var newHashTable = this.resize(this, this._limit * 2);

    this._storage = newHashTable._storage;
    this._limit = newHashTable._limit;
    this._count = newHashTable._count;

  }

};


HashTable.prototype.resize = function (oldHT, newSize) {

    var newHashTable = new HashTable();

    newHashTable._storage = LimitedArray(newSize);
    newHashTable._limit = newSize;

    // hashBucket = storage[index]
    oldHT._storage.each(function(hashBucket) {
      // each hashBucket is an array
      // iterate over this array
      if (hashBucket !== undefined){
        hashBucket.forEach(function(tuple) {
          newHashTable.insert(tuple[0],tuple[1]);
        });
      }

    });  

    return newHashTable;

}


HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var objRetrieve = this._storage.get(index);

  if (objRetrieve !== undefined){

    if (objRetrieve.some(function(tuple){ return tuple[0] === k; })) {

      for (var i = 0; i < objRetrieve.length; i++){
        if (objRetrieve[i][0] === k){
          return objRetrieve[i][1];
        }
      }
    } else {
     return undefined; 
    }

  } else {
    return undefined;
  }

};

HashTable.prototype.remove = function(k) {

  var index = getIndexBelowMaxForKey(k, this._limit);
  var objRemove = this._storage.get(index);
  
  if (objRemove !== undefined){

    if (objRemove.some(function(tuple){ return tuple[0] === k; })) {

      for (var i = 0; i < objRemove.length; i++){
        if (objRemove[i][0] === k){
          objRemove = objRemove.slice(0,i).concat(objRemove.slice(i+1,objRemove.length));
          this._count--;
        }
      }
    } 
  }
  this._storage.set(index, objRemove);

  // resize here
  if (this._count < (0.25 * this._limit)){

    var newHashTable = this.resize(this, this._limit / 2);

    this._storage = newHashTable._storage;
    this._limit = newHashTable._limit;
    this._count = newHashTable._count;

  }

};



/*
 * Complexity: What is the time complexity of the above functions?
 * Constant time: O(1) for all functions if no resizing needed.
 * If resizing needed (for insert or remove), then O(n)
 */


