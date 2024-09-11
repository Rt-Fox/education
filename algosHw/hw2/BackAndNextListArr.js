class ListArrNode {
    constructor(value, prev = null, next = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class ListArr {
    constructor() {
        this.head = null;
        this.tail = null;

        this.comparator = function (i, j) {
                if (i < j) return -1;
                if (i > j) return 1;
                return 0;
            };
    }

    prepend(value) {
        let newNode = new ListArrNode(value,null, this.head);
        this.head = newNode;

        if (!this.tail) this.tail = newNode;
    }

    append(value) {
        let newNode = new ListArrNode(value);
        if (this.tail) this.tail.next = newNode;

        newNode.prev = this.tail

        this.tail = newNode;

        if (!this.head) this.head = newNode;
    }

    delete(value) {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.value === value) {
                deletedNode = currentNode;

                if (deletedNode === this.head) {
                    this.head = deletedNode.next;

                    if (this.head) {
                        this.head.previous = null;
                    }
                    if (deletedNode === this.tail) {
                        this.tail = null;
                    }
                } else if (deletedNode === this.tail) {
                    this.tail = deletedNode.prev;
                    this.tail.next = null;
                } else {
                    const previousNode = deletedNode.prev;
                    const nextNode = deletedNode.next;
                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }
            }

            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    find(value) {
        if (!this.head) return null;

        let current = this.head;

        while (current) {
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
}

function main() {
    let listArr = new ListArr();
    listArr.append('первый')
    listArr.prepend('препервый')
    listArr.append('второй')
    listArr.append('третий')
    listArr.append('четвертый')
    listArr.append('5')
    listArr.append('6')
    listArr.append('7')
    listArr.forEach(el => console.log(el))
    console.log('--------------------------')
    listArr.delete('6')

    console.log(listArr.find('6'))
    console.log(listArr.find('четвертый'))


    //
    listArr.forEach(el => console.log(el))
}

main()