const { checkIsomorphism } = require('./code.js');
const jsc = require('jsverify');
// Visualizations made with https://asciiflow.com/#/
// Graph inspirations take from https://www.geeksforgeeks.org/graph-types-and-applications/

// Example graphs 
//---------------------

// Complete Graph
// ┌───────────────────┐   
// │                   │   
// │ ┌───┐           ┌─▼─┐ 
// │ │ 0 ◄───────────► 1 │ 
// │ └─▲─►           └─▲─┘ 
// │   │ └───────┐     │   
// │   │         │     │   
// │   │         │     │   
// │   │         │     │   
// │   │         └───┐ │   
// │ ┌─▼─┐           ◄─▼─┐ 
// └─► 2 ◄───────────► 3 │ 
//   └───┘           └───┘ 
// I used a bidirectional connection to demonstrate that vertices connect both ways                        
const completeGraph = [
    [0, 1, 2, 3], //vertices
    [[0, 1], [0, 2], [0, 3],[1,0] ,[1, 2], [1, 3], [2, 3], [2,1],[2,0],[3,0],[3,2],[3,1]] //edges
];
// isomorphic to completeGraph but with different vertice labels
const iso_completeGraph = [
    [4, 5, 6, 7], // vertices with different labels
    [[4, 5], [4, 6], [4, 7], [5, 4], [5, 6], [5, 7], [6, 7], [6, 5], [6, 4], [7, 4], [7, 6], [7, 5]] // edges
];

// CycleGraph
                          
//    ┌────────────────────┐ 
//    │                    │ 
//  ┌─▼─┐           ┌───┐  │ 
//  │ 0 ├───────────► 1 │  │ 
//  └───┘           └─┬─┘  │ 
//                    │    │ 
//                    │    │ 
//                    │    │ 
//         ┌──────────┘    │ 
//         │               │ 
//  ┌───┐◄─┘        ┌───┐  │ 
//  │ 2 │           │ 3 ├──┘ 
//  └───┴──────────►└───┘    
                          
const cycleGraph = [
    [0, 1, 2, 3], //vertices:
    [[0, 1], [1, 2], [2, 3], [3, 0]] //edges
];

// Star Graph
// ┌───┐           ┌───┐ 
// │ 0 ├──────────►│ 1 │ 
// └─┬─┤           └───┘ 
//   │ │                 
//   │ │                 
//   │ └─────────────┐   
//   │               │   
//   │               │   
// ┌─▼─┐           ┌─▼─┐ 
// │ 2 │           │ 3 │ 
// └───┘           └───┘ 
                      

const starGraph = [
    [0, 1, 2, 3],
    [[0, 1], [0, 2], [0, 3]]
];

// Bipartite Graph
// https://www.prepbytes.com/blog/graphs/bipartite-graph-and-example/
//           ┌───┐            
//   ┌───────► 0 ◄────────┐   
//   │       └───┘        │   
//   │                    │   
// ┌─▼─┐                ┌─▼─┐ 
// │ 5 │                │ 1 │ 
// └─▲─┘                └─▲─┘ 
//   │                    │   
//   │                    │   
// ┌─▼─┐                ┌─▼─┐ 
// │ 4 │                │ 2 │ 
// └─▲─┘                └─▲─┘ 
//   │       ┌───┐        │   
//   └───────► 3 ◄────────┘   
//           └───┘            
const bipartiteGraph_Hex = [
    [0, 1, 2, 3, 4, 5],
    [[0, 1],[0,5], [1, 2], [1,0], [2, 3], [2, 1], [3, 4], [3,2], [4, 5], [4,3],[5, 0], [5, 4]]
];

const graphs = [completeGraph,  cycleGraph, starGraph, bipartiteGraph_Hex];

// jsverify generator for pairs of graphs
const graphPairGenerator = jsc.bless({ // jsc.bless wraps the function into a form that jsverify recognizes as a generator. 
    generator: function () {
        // select a random graph for first item
        const index1 = jsc.random(0, graphs.length - 1);
        // select a random Graph for second item
        const index2 = jsc.random(0, graphs.length - 1);
        // return the pair of graphs indexed from the graph list
        return [graphs[index1], graphs[index2]];
    }
});

// Test for non-isomorphism between different graphs and self isomprhism 
jsc.assert(jsc.forall(graphPairGenerator, (graphPair) => {
    const [g1, g2] = graphPair;
    const result = checkIsomorphism(g1, g2);
    // console.log(`Testing isomorphism between graphs: Result is ${result}`);
    // Expect non-isomorphism unless they are the same graph
    return (g1 === g2) ? result : !result;
}), {tests: 100, verbose: true});

// Test to check if completeGraph and iso_completeGraph are identified as isomorphic correctly
jsc.assert(jsc.forall(jsc.constant(completeGraph), jsc.constant(iso_completeGraph), (g1, g2) => {
    const result = checkIsomorphism(g1, g2);
    // console.log(`Testing isomorphism between completeGraph and its isomorphic variant: Result is ${result}`);
    return result; // Expect true since both graphs are isomorphic
}), {tests: 1, verbose: true});