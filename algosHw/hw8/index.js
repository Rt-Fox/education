function DirectSearch(string, substring) {
    let res = -1;
    let sl = string.length;
    let ssl = substring.length;

    if (sl === 0 || ssl === 0 || typeof string !== 'string' || typeof substring !== "string") {
        console.log('Неверно задана строка')
        return
    }
    for (let i = 0; i < sl - ssl + 1; i++) {
        for (let j = 0; j < ssl; j++) {
            if (substring[j] !== string[i + j]) {
                break;
            } else {
                if (j === ssl - 1) {
                    res = i;
                }
            }
        }
    }
    return res;
}

function KMPSearch(string, substring) {
    let sl = string.length;
    let ssl = substring.length;

    if (sl === 0 || ssl === 0 || typeof string !== 'string' || typeof substring !== "string") {
        console.log('Неверно задана строка')
        return
    }
    let i = 0;let j = 0;let k = -1;let d = new Array(1000);
    d[0] = -1;
    while (j < ssl - 1) {
        while (k >= 0 && substring[j] !== substring[k]) {
            k = d[k]
        }
        j++;k++;
        if (substring[j] === substring[k]) {
            d[j] = JSON.parse(JSON.stringify(d[k]))
        } else {
            d[j] = k
        }
    }
    i = 0;j = 0;
    while (j < ssl && i < sl) {
        while (j >= 0 && string[i] !== substring[j]) {
            j = d[j]
        }
        i++;
        j++;
    }
    return j === ssl ? i - ssl : -1;
}

function BMSearch(string, substring) {
    let res = -1;
    let sl = string.length;
    let ssl = substring.length;
    let obj = {};let j;let Pos;

    for (let i = 0; i < ssl - 1; i++) {
        obj[substring.charAt(i)] = ssl - i - 1;
    }

    let i = 0;
    while (i < sl) {
        for (j = ssl - 2; j >= 0; j--) {
            if (substring.charAt(j) !== string.charAt(i + j)) {
                break;
            }
        }
        if (j < 0) {
            i++;
            res = i;
        } else {
            Pos = obj[string.charAt(i + j)];
            if (!Pos)
                Pos = ssl + 1;
            Pos += j - ssl;
            if (Pos <= 0)
                Pos = 1;
            i += Pos;
        }
    }
    return res - 1;
}

function task2(str) {
    let max = 0;
    let count = 0;
    let countTemp = "";
    let resultCount = 0;
    for (let i = 1; i < str.length; i++) {
        count = 0;
        let tempStr = str.substring(0, i);
        for (let j = 0; j < str.length; j += i) {
            if (j + i < str.length) {
                countTemp = str.substring(j, j + i);
                if (tempStr === countTemp) {
                    count++;
                    if (count > 1 && count>max) {
                        max = count;
                        resultCount=((j+i)-j);
                    }
                } else {
                    break
                }
            }
        }
    }
    return resultCount
}

function task3(a, b) {
    let strA = a.toLowerCase();
    let strB = b.toLowerCase();
    let res = 0;let prefix = '';
    for (let i = 1; i < strA.length; i++) {
       prefix = strA.slice(0, i)
       if (strB.includes(prefix)) {
           if (i > res) {
               res = i
           }
       } else {
           break
       }
    }
    return res
}

function task4(str) {
    let start = 0;
    let end = 0;

    for (let i = 0; i < str.length; i++) {
        let len1 = isPalindrom(str, i, i);
        let len2 = isPalindrom(str, i, i + 1);
        let len = Math.max(len1, len2);

        if (len > end - start) {
            start = Math.ceil(i - (len - 1) / 2);
            end = Math.floor(i + len / 2);
        }
    }

    function isPalindrom(s, L, R) {
        while (L >= 0 && R < s.length && s[L] === s[R]) {
            L--;
            R++;
        }
        return R - L - 1;
    }

    return end + 1 - start;
}

function main() {
    console.log(DirectSearch('adbadassdasbwd', 'dasb'))
    console.log(KMPSearch('adbadassdasbwd', 'dasb'))
    console.log(BMSearch('adbadassdasbwd', 'dasb'))
    console.log(task2('abababa')) // 2
    console.log(task3('abcdefghijklmnopqrstuvwxyz', 'Abcd?aBcd!abCd.abcD!?')) // 4
    console.log(task4('a123bc9e9c321')) // 5
}
main()