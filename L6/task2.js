const bin = ['1100000110', '1100010', '1011010,001', '1010100010,001'];
const oct = ['1537,22'];
const hex = ['2D9,8']

bin.forEach(i => convert(i, 2));
oct.forEach(i => convert(i, 8));
hex.forEach(i => convert(i, 16));

function convert(n, type) {
    n = n.split(',')
    let f = 0;
    if (n[1]) {
        for (let i = 0; i < n[1].length; i++) {
            f += n[1][i] * Math.pow(type, -1 * (i + 1))
        }
        f = f.toString().slice(2)
    }
    console.log(`${n}: ${parseInt(n[0], type)}${n[1] ? `,${f}` : ''}`);
}