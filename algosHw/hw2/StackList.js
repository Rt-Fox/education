class Stack {
    constructor() {
        this.stack = [];
    }
    push(item) {
        this.stack.push(item);
    }
    pop() {
        this.stack.pop();
    }
}

function main() {
    let stack = new Stack();
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.pop()
}

main()