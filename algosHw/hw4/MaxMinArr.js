function MaxMinArr(arr) {
    let diff = 0;
    let curr_sum = 0;
    let max_sum = 0;
    let i = 0
    while (i < arr.length - 1) {
        diff = arr[i+1] - arr[i];
        if (curr_sum > 0)
            curr_sum += diff;
        else
            curr_sum = diff;

        if (curr_sum > max_sum)
            max_sum = curr_sum;
        i++
    }
    return max_sum
}
function main() {
    let arr = [11, 40, 7, 1, 18, 3, 6, 8, 11, 31]
    let answer = MaxMinArr(arr)
    console.log(answer)
}
main()