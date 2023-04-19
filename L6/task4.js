const bin = [['1010101101', '110011110'], ['1010001111', '1001001110'],
 ['1111100100,11011', '101110111,011']];
const oct = [['1437,24', '473,8']];
const hex = [['24A,4', 'B3,8']]

bin.forEach(i => substract(i[0], i[1], 2));
oct.forEach(i => substract(i[0], i[1], 8));
hex.forEach(i => substract(i[0], i[1], 16));

function convert(n, type) {
    n = n.split(',')
    let f = 0;
    if (n[1]) {
        for (let i = 0; i < n[1].length; i++) {
            f += parseInt(n[1][i], type).toString(10) * Math.pow(type, -1 * (i + 1));
        }
    }
    return parseInt(n[0], type) + f;
}

function substract(a, b, type) {
    console.log(`${a} - ${b} = ${convert(a, type)} - ${convert(b, type)} = ${convert(a, type) 
        - convert(b, type)}`);
}