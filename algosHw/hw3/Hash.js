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

function main() {
    const arr = ['dsadas', 'dsadas', 'dsadas', 'aa', 'aa', 'dsa', 'dsa', 'ab', 'abv', 'avsc']
    const result = new Map()

    arr.forEach(el => {
        let key = el.hashCode()
        if (result.has(key)) {
            result.get(key).count++
        } else {
            result.set(key, {count: 1, value: el})
        }
    })

    console.log(result)
}

main()