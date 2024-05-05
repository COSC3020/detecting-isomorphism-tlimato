[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/NYae883E)

# Graph Isomorphism

Devise an algorithm to determine whether two given graphs are isomorphic or not.
It takes two graphs as an argument and returns `true` or `false`, depending on
whether the graphs are isomorphic or not. Your algorithm needs to handle both
the case where the two graphs are isomorphic and where they are not isomorphic.

Hint: Your algorithm does not need to be the best possible algorithm, but should
avoid unnecessarily repeating work.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the worst-case big $\Theta$ time complexity of your algorithm?

### Answer

To be very clear, the runtime complexity of this is pretty terrible given the nature of checking **multiple permutations of the graph** and also **comparing adjacency lists** to check isomorphism. I couldn't really see another way to do this without maybe exploring a library that impliments a much more sophisticated algorithm for checking graph isomorphism. I view this implementaiton similar to how we discuss quicksort, a simple implimentation, while still complex, is nowhere near the phd level work that goes into actual quicksort design implimentations used in the real world. Specifically Cytoscape.js and iGraph (an R librar)use more sophisticated algorithms for checking graph isomorphism, but it is not a trivial algorithm and is not something I'm likely ever going to impliment from scratch. Here is a link to there documentation: https://js.cytoscape.org/#eles.same and https://r.igraph.org/reference/isomorphic.html

1. **multiple permutations of the graph**: The algorithm generates all permutations of the edges of one of the graphs. If the graph has $n$ vertices, then there are $n!$ permutations.

2. **comparing adjacency lists**: For each permutation, the algorithm constructs a new adjacency list for the permuted graph and compares it to the adjacency list of the other graph being tested for isomporphism. Comparing two adjacency lists can be done in $\Theta(n^2)$ time, considering its necessary at worst case to check each possible edge between any two vertices for example with a fully connected graph. This is because each ajacency list is a $n \times n$ matrix and each comparison involves checking each entry in the matrix, which is $\Theta(n^2)$ work.

given both steps 1 and 2 are nested, meaning each permutation REQUIRES checking the adjacency list of the other graph, the algorithm runs in $\Theta(n! \times n^2)$ time.

### Resources Consulted

This problem was much harder than expected. I had to look up numerous online resources to get an idea on how to systemically impliment the theory for checking isomorphism that we have been taught in class.

VERY NAIVE Discussion of the components, but it gave an idea of where to start
1) https://stackoverflow.com/questions/3876354/algorithm-for-determining-if-2-graphs-are-isomorphic

This is an implimentation in R that outlines a structure that was helpful for solving this problem
2) https://r.igraph.org/reference/isomorphic.html

There is a wikipage dedicated to this problem and I honestly got really lost trying to decipher it. It discusses researchers who have devised much more efficient solutions such as in 2017, László Babai after multiple corrections had running time is $2O((log n)3)$. Pretty cool but way above my abilities to understand as of right now.
3) https://en.wikipedia.org/wiki/Graph_isomorphism_problem

Given I pulled an All nighter for this problem, my analysis of more intelligent solutions may be clouded but nonetheless I chose something that worked rather than was particularly efficient.
