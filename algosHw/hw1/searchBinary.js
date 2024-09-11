const binary = (array, target) => {
    let start = 0;
    let end = array.length;
    let pivot = Math.floor((start + end) / 2);

    for (let i = 0; i < end; i++) {
        if (array[pivot] !== target) {
            if (target < array[pivot]) end = pivot;
            else start = pivot;
            pivot = Math.floor((start + end) / 2);
        }

        if (array[pivot] === target) return target;
    }

    return null;
};


function main() {
    let array = [4, 8, 7, 1, 1, 2, 15, 123, 13, 13, 2, 11, 1, 3];
    console.log(binary(array.sort(), 15));
    console.log(binary(array.sort(), 10));
}

main()