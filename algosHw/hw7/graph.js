class ListArrNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class ListArr {
    constructor() {
        this.head = null;
        this.tail = null;

        this.comparator = (edgeA, edgeB) => {
            if (edgeA === edgeB) {
                return 0;
            }

            return edgeA < edgeB ? -1 : 1;
        };
    }

    prepend(value) {
        let newNode = new ListArrNode(value, this.head);
        this.head = newNode;

        if (!this.tail) this.tail = newNode;

        return this
    }

    append(value) {
        let newNode = new ListArrNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail.next = newNode;
        this.tail = newNode;
    }

    delete(value) {
        if (!this.head) return;

        while (this.head && this.comparator(this.head.value, value) === 0) {
            this.head = this.head.next;
        }

        let current = this.head;

        if (current !== null) {
            while (current.next) {
                if (this.comparator(current.next.value, value) === 0) {
                    current.next = current.next.next;
                } else {
                    current = current.next;
                }
            }
        }

        if (this.comparator(this.tail.value, value) === 0) {
            this.tail = current;
        }
    }

    find(value = undefined, callback = undefined) {
        if (!this.head) return null;

        let current = this.head;

        while (current) {
            if (callback && callback(current.value)) {
                return current;
            }
            if (this.comparator(current.value, value) === 0) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    forEach(callback) {
        let current = this.head;
        while (current) {
            callback(current.value);
            current = current.next;
        }
    }

    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }
}

class GraphVertex {
    constructor(value) {
        this.value = value;
        this.edges = new ListArr();
    }

    addEdge(edge) {
        this.edges.append(edge);

        return this;
    }

    deleteEdge(edge) {
        this.edges.delete(edge);
    }

    getNeighbors() {
        const edges = this.edges.toArray();

        const neighborsConverter = (node) => {
            return node.value.startVertex === this ? node.value.endVertex : node.value.startVertex;
        };

        return edges.map(neighborsConverter);
    }

    findEdge(vertex) {

        const edgeFinder = (edge) => {
            return edge.startVertex === vertex || edge.endVertex === vertex;
        };

        const edge = this.edges.find(undefined,  edgeFinder );

        return edge ? edge.value : null;
    }

    getKey() {
        return this.value;
    }

}

class GraphEdge {
    constructor(startVertex, endVertex, weight = 0) {
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.weight = weight;
    }

    getKey() {
        const startVertexKey = this.startVertex.getKey();
        const endVertexKey = this.endVertex.getKey();

        return `${startVertexKey}_${endVertexKey}`;
    }

}

class Graph {
    constructor() {
        this.vertices = {};
        this.edges = {};
    }

    addVertex(newVertex) {
        this.vertices[newVertex.getKey()] = newVertex;

        return this;
    }

    getVertexByKey(vertexKey) {
        return this.vertices[vertexKey];
    }

    getNeighbors(vertex) {
        return vertex.getNeighbors();
    }

    getAllVertices() {
        return Object.values(this.vertices);
    }

    getAllEdges() {
        return Object.values(this.edges);
    }

    addEdge(edge) {
        let startVertex = this.getVertexByKey(edge.startVertex.getKey());
        let endVertex = this.getVertexByKey(edge.endVertex.getKey());

        if (!startVertex) {
            this.addVertex(edge.startVertex);
            startVertex = this.getVertexByKey(edge.startVertex.getKey());
        }

        if (!endVertex) {
            this.addVertex(edge.endVertex);
            endVertex = this.getVertexByKey(edge.endVertex.getKey());
        }

        if (!this.edges[edge.getKey()]) {
            this.edges[edge.getKey()] = edge;
        }

        startVertex.addEdge(edge);
        endVertex.addEdge(edge);

        return this;
    }

    deleteEdge(edge) {
        if (this.edges[edge.getKey()]) {
            delete this.edges[edge.getKey()];
        }
        const startVertex = this.getVertexByKey(edge.startVertex.getKey());
        const endVertex = this.getVertexByKey(edge.endVertex.getKey());

        startVertex.deleteEdge(edge);
        endVertex.deleteEdge(edge);
    }

    findEdge(startVertex, endVertex) {
        const vertex = this.getVertexByKey(startVertex.getKey());

        if (!vertex) {
            return null;
        }

        return vertex.findEdge(endVertex);
    }

    getWeight() {
        return this.getAllEdges().reduce((weight, graphEdge) => {
            return weight + graphEdge.weight;
        }, 0);
    }

    getVerticesIndices() {
        const verticesIndices = {};
        this.getAllVertices().forEach((vertex, index) => {
            verticesIndices[vertex.getKey()] = index;
        });

        return verticesIndices;
    }

    getAdjacencyMatrix() {
        const vertices = this.getAllVertices();
        const verticesIndices = this.getVerticesIndices();

        const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
            return Array(vertices.length).fill(Infinity);
        });

        vertices.forEach((vertex, vertexIndex) => {
            vertex.getNeighbors().forEach((neighbor) => {
                const neighborIndex = verticesIndices[neighbor.getKey()];
                adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
            });
        });

        return adjacencyMatrix;
    }
    dfs(vertex, visited = []) {
        visited.push(vertex);
        console.log(vertex)
        vertex.getNeighbors().forEach((el) => {
            if(!visited.includes(el)) {
                this.dfs(el, visited);
            }
        })
    }
    bfs(vertex) {
        let queue = [];
        let visited = [vertex];
        queue.push(vertex);
        while(queue.length) {
            let current = queue.shift ();
            console.log(current);
            current.getNeighbors().forEach((el) => {
                if(!visited.includes(el)) {
                    queue.push(el);
                    visited.push(el);
                }
            })
        }
    }

    deiksterAlgoritm(startVertex, endVertex = undefined) {
        const indices = this.getVerticesIndices()
        const matrix = this.getAdjacencyMatrix()

        const rows = matrix.length;
        const cols = matrix[0].length;

        const startIndex = startVertex.getKey()

        const distance = new Array(rows).fill(null).map(() => Infinity);
        distance[indices[startIndex]] = 0;

        for(let i = 0; i < rows; i++) {
            if(distance[i] < Infinity) {
                for(let j = 0; j < cols; j++) {
                    if(matrix[i][j] + distance[i] < distance[j]) {
                        distance[j] = matrix[i][j] + distance[i];
                    }
                }
            }
        }
        if (endVertex) {
            let endIndex = endVertex.getKey()
            console.log(distance[indices[endIndex]]);
        } else {
            console.log(distance);
        }
    }

    findEnd(arr, index) {
        let temp = index
        while (arr[temp] > 0) {
            temp = arr[temp];
        }
        return temp;
    }


    krascalAlgoritm() {
        const allEdges = this.getAllEdges()
        const indices = this.getVerticesIndices()
        const savedEdge = new Array(allEdges.length).fill(0);
        const result = [];
        allEdges.sort((a, b) => {
            return a.weight - b.weight
        })

        for (let i = 0; i < allEdges.length; i++) {
            const edge = allEdges[i];
            let start = this.findEnd(savedEdge, indices[edge.startVertex.value]);
            let end = this.findEnd(savedEdge, indices[edge.endVertex.value]);

            if (start !== end) {
                result.push(edge);
                savedEdge[start] = end;
            }
        }
        console.log(result)
        return result

    }
}

function main() {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');
    const vertexI = new GraphVertex('I');

    graph.addVertex(vertexA)
    graph.addVertex(vertexB)
    graph.addVertex(vertexC)
    graph.addVertex(vertexD)
    graph.addVertex(vertexE)
    graph.addVertex(vertexF)
    graph.addVertex(vertexG)
    graph.addVertex(vertexH)
    graph.addVertex(vertexI)

    const edgeAB = new GraphEdge(vertexA, vertexB, 2);
    const edgeAD = new GraphEdge(vertexA, vertexD, 3);
    const edgeAE = new GraphEdge(vertexA, vertexE, 5);
    const edgeBC = new GraphEdge(vertexB, vertexC, 10);
    const edgeEC = new GraphEdge(vertexE, vertexC, 2);
    const edgeDF = new GraphEdge(vertexD, vertexF, 8);
    const edgeEF = new GraphEdge(vertexE, vertexF, 7);
    const edgeGF = new GraphEdge(vertexG, vertexF, 4);
    const edgeFH = new GraphEdge(vertexF, vertexH, 3);
    const edgeHC = new GraphEdge(vertexH, vertexC, 5);
    const edgeCI = new GraphEdge(vertexC, vertexI, 6);
    const edgeGI = new GraphEdge(vertexG, vertexI, 11);

    graph.addEdge(edgeAB);
    graph.addEdge(edgeGF);
    graph.addEdge(edgeBC);
    graph.addEdge(edgeAD);
    graph.addEdge(edgeAE);
    graph.addEdge(edgeEC);
    graph.addEdge(edgeDF);
    graph.addEdge(edgeEF);
    graph.addEdge(edgeFH);
    graph.addEdge(edgeHC);
    graph.addEdge(edgeCI);
    graph.addEdge(edgeGI);

    graph.dfs(vertexA)
    // const adjacencyMatrix = graph.deiksterAlgoritm(vertexA, vertexC);
    // graph.krascalAlgoritm();
}

main()