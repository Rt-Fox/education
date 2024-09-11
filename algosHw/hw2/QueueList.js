class Queue {
    constructor() {
        this.queue = [];
        this.tail = 0;
        this.head = null;
    }

    isEmpty() {
        return !this.head;
    }

    peek() {
        return this.head;
    }

    enqueue(value) {
        if (this.tail === 0) this.head = value
        this.queue[this.tail++] = value;
    }

    dequeue() {
        if (this.tail === this.head)
            return undefined
        let element = this.queue[this.head];
        delete this.queue[this.head++];
        return element;
    }
}

function main() {
    let queue = new Queue();


    console.log(queue.isEmpty())
    queue.enqueue('1')
    queue.enqueue('2')
    console.log(queue.peek())
    queue.dequeue()
    console.log(queue.peek())
    console.log(queue.isEmpty())
}

main()