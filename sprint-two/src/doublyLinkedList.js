var DoublyLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var newNode = new Node(value);

    // List = empty
    if (list.tail === null) {
      list.tail = newNode;
      list.head = newNode;

    // List is not empty
    } else {
      // 1) existing tail.next = newNode
      list.tail.next = newNode;
      // 2) set newNode.prev = tail
      newNode.previous = list.tail;
      // 3) change tail to newNode
      list.tail = newNode;
    }
  };

  list.removeHead = function() {
    var oldHead = list.head.value;
    if (list.head !== null){
      if (list.head !== list.tail) {
        list.head.next.previous = null;
        list.head = list.head.next;        
      } else {
        list.head = null;
        list.tail = null;
      }
    }
    return oldHead;
  };

  list.contains = function(target) {
    if (list.head === null){
      return false;
    } else {

      var currentNode = list.head;

      while (currentNode.value !== target && currentNode.next !== null) {
        currentNode = currentNode.next;       
      }

      return currentNode.value === target;

    }

  };

  list.addToHead = function(value) {

    // Create a new node
    var newNode = new Node(value);
    // Case 1) list is empty
      // set head and tail
    if (list.tail === null) {
      list.head = newNode;
      list.tail = newNode;
    } else {
    // Case 2) list is not empty
      // a) set newNode.next = list.head
      // b) set list.head.previous = newNode
      // c) set newNode as the list.head
      newNode.next = list.head;
      list.head.previous = newNode;
      list.head = newNode;      
    }


  };

  list.removeTail = function(value) {

    // if tail is not null
    if (list.tail !== null) {
      if (list.head === list.tail) {
        list.head = null;
        list.tail = tail;
      } else {
        list.tail.previous.next = null;
        list.tail = list.tail.previous;
      }
    }
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  // New for Doubly Linked List
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?

    - addToTail and removeHead: O(1)
    - contains: O(n)
 */
