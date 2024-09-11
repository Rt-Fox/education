String.prototype.hashCode = function() {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};


function RobinCarp(S, T) {
    let answer = 0
    let n = S.length
    let m = T.length

    let hashS = S.hashCode()
    let hashT = T.substr(0, n).hashCode()
    let i = 0
    while ( i <= m - n) {
        hashT = T.substr(i, n).hashCode()
        if (hashS === hashT) answer++
        i++
    }

    return answer
}

function main() {
    console.log(RobinCarp('ab', 'abs ab trs abbb, ababab, rab'))
}

main()