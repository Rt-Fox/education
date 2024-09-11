class Node {
    constructor(way,value) {
        this.way = '' + way
        this.val = value;
        this.child = []
    }
}

class BinarySearchTree {
    constructor(rootValue = null) {
        this.root = new Node(rootValue, rootValue);
    }
    insert(parentWay, newValue) {
        const parentNode = this.searchNode(parentWay)
        let newNode = new Node(parentNode?.way +''+ newValue, newValue)
        parentNode?.child?.push(newNode)
    }
    delete(way) {
        const Node = this.searchNode(way)
        let parentWay = Node.way.substr(0,Node.way.length - Node.val.length)
        const parentNode = this.searchNode(parentWay)

        let myIndex = parentNode.child.indexOf(Node);
        parentNode.child.splice(myIndex, 1);
    }

    searchNode(parentWay) {
        if(this.root.way === parentWay) {
            return this.root
        } else {
            let a = this.searchValue(this.root, parentWay)
            return a
        }
    }
    searchValue(currentNode, parentWay) {
        if (currentNode?.way === parentWay) return currentNode
        let answer = null
        for (let i = 0; i < currentNode?.child.length; i += 1) {
            let node = currentNode?.child[i]
            let answer = this.searchValue(node, parentWay)
            if (answer && answer.way === parentWay) return answer
        }
        return answer
    }

    startOrderPrint(currentNode = this.root) {
        if (!currentNode) {
            return
        }
        console.log(currentNode.val)

        currentNode?.child && currentNode?.child.forEach((node) => {
            this.startOrderPrint(node);
        })

    }
    endOrderPrint(currentNode = this.root) {
        if (!currentNode) {
            return
        }
        currentNode?.child && currentNode?.child.forEach((node) => {
            this.endOrderPrint(node);
        })
        console.log(currentNode.val)
    }

    reverseOrderPrint(currentNode = this.root) {
        if (!currentNode) {
            return
        }
        currentNode?.child && currentNode?.child.forEach((node, index) => {
            console.log(node.val)
            this.reverseOrderPrint(node);
            currentNode === this.root && index === 0 && console.log(this.root.val)
        })
    }
    solution(currentNode = this.root) {
        if (!currentNode) {
            return
        }
        currentNode?.child && currentNode?.child.forEach((node) => {
            this.solution(node);
        })
        if ( ['+', '-', '*', '/'].find((i) => i === currentNode.val)) {
            currentNode.val = eval(currentNode.child[0].val + currentNode.val + currentNode.child[1].val)
        }

        return this.root.val
    }
}

function main() {
    let BST = new BinarySearchTree('a');
    BST.insert('a', 'b')
    BST.insert('a', 'c')
    BST.insert('ab', 'd')
    BST.insert('ab', 'e')
    BST.insert('ac', 'f')
    BST.startOrderPrint()
    console.log(222)
    BST.endOrderPrint()
    console.log(222)
    BST.reverseOrderPrint()


    // let BST = new BinarySearchTree('/');
    // BST.insert('/', '*')
    // BST.insert('/*', '+')
    // BST.insert('/*', '-')
    // BST.insert('/*+', '/')
    // BST.insert('/*+/', '2')
    // BST.insert('/*+/', '1')
    // BST.insert('/*+', '2')
    //
    // BST.insert('/*-', '8')
    // BST.insert('/*-', '4')
    // BST.insert('/', '5')
    // console.log(BST.solution())

}

main()