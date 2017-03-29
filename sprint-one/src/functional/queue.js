var Queue = function() {

  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var count = 0;
  var cursor = 1;
  var tail = 1;

  // Implement the methods below
  someInstance.enqueue = function(value) {
    count++;
    storage[tail] = value;
    tail++;
  };

  someInstance.dequeue = function() {

    if (count > 0){
      var itemPopped = storage[cursor];
      delete storage[cursor];
      cursor++;
      count--;
      return itemPopped;
    }
    return "";
  };

  someInstance.size = function() {
    return count;
  };

  return someInstance;
};
