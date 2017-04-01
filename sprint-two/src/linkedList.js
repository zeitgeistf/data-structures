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

  list.print = function() {
    // '{' + list.value +':' + list.next + '}
    // [head][tail] -> null
    // [head][1] -> [2] -> [tail][3] -> null
    // (head)[1] -> [2](tail) -> null
    var output = '';
    // LL is empty
    if(this.head === null) {
      output = '(head)(tail) -> null';
    }
    else if (this.head === this.tail) {
      output = '(head)[' + this.head.value + '](tail) -> null';
    }
    else {
      output = '(head)[' + this.head.value +'] ';

      var nextNode = this.head.next;

      while (nextNode !== null) {
        output += '-> [' + nextNode.value + '] ';
        nextNode = nextNode.next; 
      }

      output += '(tail) -> null';
      // Current:    "(head)[1] -> [2] -> [3] ->"
      // Objective:  "(head)[1] -> [2] -> [3](tail) -> null"
    }
    console.log(output);

  }


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


