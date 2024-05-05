// Required for the permutation algorithm

function swapElements(arr, left, right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
}


function checkIsomorphism(graph1, graph2) {
    // Check if the number of vertices and edges are the same in both graphs
    if (graph1[0].length !== graph2[0].length || graph1[1].length !== graph2[1].length) {
        return false; // Cannot be isomorphic if the number of vertices or edges are different
    }

    // Create an adjacency list for the first graph
    let baseList = createAdjacencyList(graph1);
    // Explore all permutations of vertices in the second graph to check for isomorphism
    return explorePermutations(baseList, graph2, 0);
}

// We almost always want to start at the 0 index of the adjacency list but we need an explicit startNode parameter to enable recursion
// WE MUST explore permutations of a given graph in order to check for isomorphism because the labels might be different but the graphs are still isomorphic.
// There probably are wayyyyy more efficient ways to do this.
function explorePermutations(baseList, graph, startNode) {
    // Create an adjacency list for the current permutation of the graph
    let permutedList = createAdjacencyList(graph);

    // Compare the newly created adjacency list with the base list (from the first graph)
    // given a match, the current permutation shows isomorphic graphs
    if (compareLists(baseList, permutedList)) {
        return true;
    }

    // get the vertices from the graph
    let vertices = graph[0];

    // BASE CASE: NECESSARY FOR RECURSION NOT BEING INFINITE.
    if (startNode >= vertices.length - 1) {
        return false;
    }

    // Iterate over the vertices starting from the current startNode
    for (let currentNode = startNode; currentNode < vertices.length; currentNode++) {
        // Swap the startNode with the currentNode to generate a new permutation
        // This is done ONLY if they are not the same to avoid unnecessary swaps
        if (currentNode !== startNode) {
            swapElements(vertices, startNode, currentNode);
            graph[0] = vertices.slice();
        }
        // Recursively explore further permutations starting from the next vertice
        if (explorePermutations(baseList, graph, startNode + 1)) {
            return true;
        }
        // Swap back the vertices before the next iteration
        // This is necessary to ensure each permutation is generated correctly
        if (currentNode !== startNode) {
            swapElements(vertices, startNode, currentNode);
            graph[0] = vertices.slice();
        }
    }
    return false;
}

function createAdjacencyList(graph) {
    let vertices = graph[0];
    let edges = graph[1];
    // initialize list to be an array of nulls with length equal to the number of vertices
    let list = new Array(vertices.length).fill(null).map(() => []);

    // for each edge, find the index of the from and to vertices in the vertices array and add the to vertex to the from vertex's adjacency list and vice versa
    edges.forEach(edge => {
        let [from, to] = edge.map(vertex => vertices.indexOf(vertex));
        list[from].push(to);
        list[to].push(from); // Assuming undirected graph
    });
    
    return list;
}

function compareLists(list1, list2) {
    // if the lists are not the same length they cannot be isomorphic
    if (list1.length !== list2.length) {
        return false;
    }
    // if the lists are the same length, check if the lists are the same
    for (let i = 0; i < list1.length; i++) {
        // Check if the lengths of the adjacency lists at index i are different
        if (list1[i].length !== list2[i].length) {
            return false;
        }

        // Check if any corresponding elements in the adjacency lists at index i are different
        // I used the some method to determine if there is at least one element in list1[i] that does not match the corresponding element in list2[i].
        if (list1[i].some((val, idx) => val !== list2[i][idx])) {
            return false;
        }
    }
    return true;
}
module.exports = {checkIsomorphism, createAdjacencyList};

// Sanity check:
// const graph1 = [
//    [0, 1, 2], // vertices
//     [[0, 1], [1, 2], [2, 0]] // edges
// ];

// const graph2 = [
//    [0, 1, 2, 3], // vertices
//    [[0, 1], [1, 2], [0, 2], [0, 3], [1, 3], [2, 3]] // edges
// ];

// console.log(checkIsomorphism(graph1, graph2)); // Output: false