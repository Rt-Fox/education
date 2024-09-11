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

        this.comparator = function (i, j) {
                if (i < j) return -1;
                if (i > j) return 1;
                return 0;
            };
    }

    prepend(value) {
        let newNode = new ListArrNode(value, this.head);
        this.head = newNode;

        if (!this.tail) this.tail = newNode;
    }

    append(value) {
        let newNode = new ListArrNode(value);
        if (this.tail) this.tail.next = newNode;
        this.tail = newNode;
        if (!this.head) this.head = newNode;
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