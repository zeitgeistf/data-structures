describe('red-blackTree', function() {
  var redBlackTree;

  beforeEach(function() {
    redBlackTree = RedBlackTree(5);
  });

  it('should have methods named "insert", "contains", and "depthFirstLog"', function() {
    expect(redBlackTree.insert).to.be.a('function');
    expect(redBlackTree.contains).to.be.a('function');
    expect(redBlackTree.depthFirstLog).to.be.a('function');
  });

  it('should insert values at the correct location in the tree', function() {
    redBlackTree.insert(2);
    redBlackTree.insert(3);
    redBlackTree.insert(7);
    redBlackTree.insert(6);
    expect(redBlackTree.left.right.value).to.equal(3);
    expect(redBlackTree.right.left.value).to.equal(6);
  });

  it('should have a working "contains" method', function() {
    redBlackTree.insert(2);
    redBlackTree.insert(3);
    redBlackTree.insert(7);
    expect(redBlackTree.contains(7)).to.equal(true);
    expect(redBlackTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    redBlackTree.insert(2);
    redBlackTree.insert(3);
    redBlackTree.depthFirstLog(func);
    expect(array).to.eql([5, 2, 3]);
  });

  it('should have methods named "print", "shortestDepth", "longestDepth",  and "rebalance"', function() {
    expect(redBlackTree.print).to.be.a('function');
    expect(redBlackTree.shortestDepth).to.be.a('function');
    expect(redBlackTree.longestDepth).to.be.a('function');
    expect(redBlackTree.rebalance).to.be.a('function');
  });

  it('should return the correct shortest depth', function() {

    redBlackTree = RedBlackTree(10);
    expect(redBlackTree.shortestDepth()).to.equal(0);


    redBlackTree.insert(5);
    redBlackTree.insert(20);
    expect(redBlackTree.shortestDepth()).to.equal(1);

    redBlackTree.insert(15);
    redBlackTree.insert(25);
    expect(redBlackTree.shortestDepth()).to.equal(1);

  });

  it('should return the correct longest depth', function() {

    redBlackTree = RedBlackTree(10);
    expect(redBlackTree.longestDepth()).to.equal(0);


    redBlackTree.insert(5);  // depth = 1
    expect(redBlackTree.longestDepth()).to.equal(1);


    redBlackTree.insert(15);
    redBlackTree.insert(14); // depth = 2
    redBlackTree.insert(13); // depth = 3
    expect(redBlackTree.longestDepth()).to.equal(3);

  });

  it('should rebalance the tree', function() {

    redBlackTree = RedBlackTree(10);

    for (var i = 9; i > 0; i--) {
      redBlackTree.insert(i);
    }

    redBlackTree.print();
    expect(((redBlackTree.longestDepth() + 1) / (redBlackTree.shortestDepth() + 1))  < 2).to.equal(true);

  });

});
