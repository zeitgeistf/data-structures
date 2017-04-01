

// Instantiate a new graph
var Graph = function() {

	this.nodes = {};


/*

	{
		1: [2],
			// delete node 2
			// find index of 2
			// swap array[0] and array[index]
			[2,3,5,6]
			// shift()
			[3,5,6]

		2: [1]
	}

	nodes[1] = [];

	nodes[1] !== undefined;
	
	nodes = [1, 2, 3];
	edges = [[1,2], [2,3]];
*/

};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
	if(!this.nodes.hasOwnProperty(node)){
		this.nodes[node] = [];
	}
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
	return this.nodes.hasOwnProperty(node);
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
	if(this.nodes.hasOwnProperty(node)){
		delete this.nodes[node];

		// remove edges to this node

	}
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
	if(this.nodes.hasOwnProperty(fromNode) && this.nodes.hasOwnProperty(toNode)){
		var index = this.nodes[fromNode].indexOf(toNode);
		return index !== -1;

	} else {
		return false;
	}
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
	if(this.nodes.hasOwnProperty(fromNode) && this.nodes.hasOwnProperty(toNode)){
		this.nodes[fromNode].push(toNode);
		this.nodes[toNode].push(fromNode);
	}
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {

	// var graphNodes = this.nodes;

	var deleteEdge = function(node1, node2) {

		// find the index of the edge
		var index = this.nodes[node1].indexOf(node2);
		// put first item of the array into temp
		var temp = this.nodes[node1][0];
		// set the head as the edge index
		this.nodes[node1][0] = this.nodes[node1][index];
		// put head value into where the target old position was
		this.nodes[node1][index] = temp;
		// use shift method to delete the first item, which is the edge index
		this.nodes[node1].shift();

	}

	// check if both nodes exist
	if(this.nodes.hasOwnProperty(fromNode) && this.nodes.hasOwnProperty(toNode)){
	
		// check if edge exists
		if(this.hasEdge(fromNode, toNode)){

			deleteEdge.call(this, fromNode, toNode);
			deleteEdge.call(this, toNode, fromNode);

		}
	}
	/*
	// find the edge in fromNode array
	// check if edge exists:
		// find the index of the edge
		// create temp var to store head
		// put target in head
		// put temp to old target position
		// shift()

	// do the same for toNode array
	*/

};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
	for(var key in this.nodes){
		cb(key);
	}

} ;

Graph.prototype.print = function() {
	
	var arr = [] ;
	for (var key in this.nodes) {
		arr.push(key);
	}

	console.log(arr.join(' | '));

	var output = '';
	for (var key in this.nodes) {
		output = key + ' : ';

		for (var i = 0; i < arr.length; i++){
			if(this.nodes[key].includes(eval(arr[i]))) {
				output += 'X';
			}
			else {
				output += ' ';
			}
		}
		console.log(output);
		output = '';
	}

};

/*
 * Complexity: What is the time complexity of the above functions?
 */


 // Run Graph tests


 function runGraphTest(count) {
 	var g = new Graph();

 	var array = [];

 	for (var i = 0; i < count; i++) {
 		var x = Math.floor(Math.random()*100) + 1;
 		while (array.includes(x)) {
 			x = Math.floor(Math.random()*100) + 1;
 		} 
 		array.push(x);
 	 	g.addNode(x);
 	}

 	for (var i = 0; i < count * 0.75; i++) {
 		var x = Math.floor(Math.random() * count);
 		var y = Math.floor(Math.random() * count);

 		while (x === y) {
			y = Math.floor(Math.random() * count); 			
 		}

 		g.addEdge(x,y);

 	}

 	g.print();
 }


