function mergeSort(array) {
    const half = array.length / 2

    if(array.length < 2){
        return array
    }

    const left = array.splice(0, half)
    return merge(mergeSort(left),mergeSort(array))
}

function merge(left, right) {
    let arr = []

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }

    return [ ...arr, ...left, ...right ]
}

function main() {
    // Во всех случаях O(nlogn),
    // Сортировка делит искомый массив попалам, и сортирует в рамках половин,
    let array = [4, 8, 7, 1, 1, 2, 15, 123, 13, 13, 2, 11, 1, 3];
    console.log(mergeSort(array));
}

main()