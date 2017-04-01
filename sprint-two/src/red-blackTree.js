/*
    Red-Black Tree
    1) A node is either red or black
    2) The root and leaves (null) are black
    3) If a node is red, then its children are black
    4) All paths from a node to its nil descendents
       contain the same number of black nodes


    Inserting a Node
    1) Insert node with color red
    2) Recolor and rotate nodes to fix the violation

    Recoloring Scenarios
    1) Z = root => color black
    2) Z.uncle : red => recolor parent, grandparent and uncle
    3) Z.uncle : black && triangle => rotate Z.parent 
    4) Z.uncle : black && line => rotate Z.grandparent & recolor
*/



var RedBlackTree = function(value, color, parent) {

    var bst = {};
    bst.value = value;
    bst.left = null;
    bst.right = null;
    bst.count = 1;
    
    // Red Black Tree
    bst.color = (color === undefined) ? 'black' : color;
    bst.parent = (parent === undefined) ? null : parent;

    bst.insert = function(newValue){

        this.count++;

        // Create new 'red' node
        var newNode = RedBlackTree(newValue, 'red');

        if (newValue < this.value) {
            if (this.left === null){
                newNode.parent = this;
                this.left = newNode;

            } else {
                this.left.insert(newValue);

            }
        } else {

            if (this.right === null){

                newNode.parent = this;
                this.right = newNode;

            } else{
                this.right.insert(newValue);

            }

        }
        if (this.parent === null) this.print();
        this.redUncle(newNode);

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

    bst.print = function() {

        var depth = 0;
        var printObj = [['[' + this.value + '|' + this.color[0] + ']']];

        var addTrees = [this.left, this.right];

        while (addTrees.some(x => x !== null)) {
            depth++;
            var addNodes = [];
            addTrees.forEach(function(x) {
                if (x === null) {
                    addNodes.push(' -- ');
                } else {
                    var space = '';
                    if (x.value < 10) space = ' ';
                    addNodes.push('[' + space + x.value + '|' + x.color[0] + ']');
                }
            });

            var lines = [];
            addNodes.forEach(function (x, i, array) {
                (i % 2) === 0 ? lines.push('  / ') : lines.push(' \\  ');
            });

            printObj.push(lines);
            printObj.push(addNodes);

            var newChildren = [];
            addTrees.forEach(function (x) {
                if( x === null ) {
                    newChildren.push(null);
                    newChildren.push(null);
                } else {
                    newChildren.push(x.left);
                    newChildren.push(x.right);
                }
            });

            addTrees = newChildren;

        }

        var length = Math.pow(2, depth);

        printObj.forEach(x => {
            var xCount = x.length;
            var spaces = 4 * (length - xCount) / (xCount + 1);
            var spacing = '';
            for (var i = 0; i < spaces; i++) {
                spacing += ' ';
            }
            var newX = [];
            x.forEach(y => {
                newX.push(spacing);
                newX.push(y);
            });
            newX.push(spacing);

            console.log(newX.join(''));
        });// console.log(x.join('  ')));

        console.log('%c === Red Black Tree Summary ===', 'background: #000; color: #0f0');
        console.log('%c ===   Number of Nodes: ' + this.count + '  ===', 'background: #000; color: #0f0');
        console.log('%c ===    Longest Depth:  ' + this.longestDepth() + '   ===', 'background: #000; color: #0f0');
        console.log('%c ===    Shortest Depth: ' + this.shortestDepth()  + '   ===', 'background: #000; color: #0f0');

        // console.log.apply(console, ['%c Oh my heavens!% %c Color 2', 'background: #222; color: #bada55', 'background: #ffhhff; color: #000']);
    }

    bst.shortestDepth = function() {
        var depth = 0;

        var children = [this.left, this.right];

        while (children.every(x => x !== null)) {
            depth++;
            var newChildren = [];
            children.forEach(x => {
                if (x !== null) {
                    newChildren.push(x.left, x.right);
                }
            });
            children = newChildren;
        }
        return depth;
    }

    bst.longestDepth = function() {
         var depth = 0;

        var children = [this.left, this.right];

        while (children.some(x => x !== null)) {
            depth++;
            var newChildren = [];
            children.forEach(x => {
                if (x !== null) {
                    newChildren.push(x.left, x.right);
                }
            });
            children = newChildren;
        }
        return depth;       
    }

    bst.rebalance = function() {
        
    }

    bst.redUncle = function(node) {
        if (node.parent !== null && node.color === 'red') {
            if (node.parent.parent !== null) {

                var uncle = node.parent.parent.left;

                if (node.parent.parent.left === node.parent) {
                    uncle = node.parent.parent.right;
                }

                if (uncle !== null && uncle.color === 'red') {
                    uncle.color = 'black';
                    node.parent.color = node.parent.color === 'red' ? 'black' : 'red';
                    if (node.parent.parent.parent !== null) {
                        node.parent.parent.color = node.parent.parent.color === 'red' ? 'black' : 'red';
                    }
                    this.redUncle(node.parent.parent);
                }
            }
        }
    }

    bst.rotateTriangle = function(node) {
        if (node.parent !== null && node.color === 'red') {

            var parentNode = node.parent;

            if (parentNode.parent !== null) {

                var grandparent = parentNode.parent;

                var uncle = grandparent.left;

                if (grandparent.left === parentNode) {
                    uncle = grandparent.right;
            
                // Check if triangle
                if ((grandparent.right === parentNode) === (parentNode.left === node)){

                    var grandparentChild = (grandparent.right === parentNode) ? grandparent.right : grandparent.left;

                    var nodeNewChild = (grandparent.right === parentNode) ? node.right : node.left;
                    var nodeOtherChild = (grandparent.right === parentNode) ? node.left : node.right;

                    var parentChild = (parentNode.left === node) ? parentNode.left : parentNode.right;
                    var parentOtherChild = (parentNode.left === node) ? parentNode.right : parentNode.left;                  
                    /*
                        1) node takes parent's spot
                            a) grandparent's child
                            b) change node's child
                            c) change parentNode.parent = node
                            d) change parent's child to null
                    */
                    node.parent = grandparent;
                    grandparentChild = node;
                    nodeNewChild = parentNode;
                    parentNode.parent = node;
                    parentChild = nodeOtherChild;






                }

                if (uncle !== null && uncle.color === 'red') {
                    uncle.color = 'black';
                    node.parent.color = node.parent.color === 'red' ? 'black' : 'red';
                    if (node.parent.parent.parent !== null) {
                        node.parent.parent.color = node.parent.parent.color === 'red' ? 'black' : 'red';
                    }
                    this.redUncle(node.parent.parent);
                }
            }
        }
    }

    return bst;

};

function testRedBlackTree(count) {
    var rbTree = RedBlackTree(50);
    var newNode = Math.floor(Math.random() * 100) + 1;
    for (var i = 0; i < count - 1; i++) {
        while (rbTree.contains(newNode)) {
            newNode = Math.floor(Math.random() * 100) + 1;
        }
        rbTree.insert(newNode);
    }
    rbTree.print();

}

/*
 * Complexity: What is the time complexity of the above functions?
 * Liner time: O(n) for all functions
 */
