const bin = [['101011', '100111']];
const oct = [['1732,4', '34,5']];
const hex = [['36,4', 'A,A']]

bin.forEach(i => multiply(i[0], i[1], 2));
oct.forEach(i => multiply(i[0], i[1], 8));
hex.forEach(i => multiply(i[0], i[1], 16));

function convert(n, type) {
    n = n.split(',')
    let f = 0;
    if (n[1]) {
        for (let i = 0; i < n[1].length; i++) {
            f += parseInt(n[1][i], type).toString(10) * Math.pow(type, -1 * (i + 1))
        }
    }
    return parseInt(n[0], type) + f;
}

function multiply(a, b, type) {
    console.log(`${a} * ${b} = ${convert(a, type)} * ${convert(b, type)} = ${convert(a, type) 
        * convert(b, type)}`);
}