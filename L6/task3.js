const bin = [['101111111', '1101110011'], ['10111110', '100011100'], ['1101100011,0111', '1100011,01']];
const oct = [['666,2', '1234,24']];
const hex = [['346,4', '3F2,6']];

bin.forEach(i => add(i[0], i[1], 2));
oct.forEach(i => add(i[0], i[1], 8));
hex.forEach(i => add(i[0], i[1], 16));

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

function add(a, b, type) {
    console.log(`${a} + ${b} = ${convert(a, type)} + ${convert(b, type)} = ${convert(a, type) 
        + convert(b, type)}`);
}