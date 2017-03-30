var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    // empty list
    var newNode = new Node(value);
    if(list.head === null){
      list.head = newNode;
      list.tail = newNode;
    }
    // multiple nodes
    else{
      list.tail.next = newNode;
      list.tail = newNode;
    }
  };

  list.removeHead = function() {
    if (list.head !== null) {
      var oldHead = list.head;
      list.head = list.head.next;
      return oldHead.value;
    }
  };

  list.contains = function(target) {

    if(list.head !== null){
      var nodeCompare = list.head;
      if(nodeCompare.value === target){
        return true;
      }
      else {
        while(nodeCompare.next !== null && nodeCompare.value !== target){
          nodeCompare = nodeCompare.next;
        }
        return target === nodeCompare.value;
      }
    }

  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?

    - addToTail and removeHead: O(1)
    - contains: O(n)
 */


