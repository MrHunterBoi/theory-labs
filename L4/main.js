const fs = require('fs');
const content = fs.readFileSync("./array.txt");

let P = [];
content.toString().split(' ').forEach(i => P.push(parseFloat(i)));

logTable(P)
calc(P)

function calc(arr) {
    let sum = 0;
    arr.forEach((i, index) => {
        let r = Math.log2(1 / i)
        process.stdout.write(`${i} * ${r} ${index === arr.length - 1 ? '=' : '+'} `)
        sum += i * r;
    })
    
    console.log(sum);
}

function logTable(P) {
    console.log(`Xi |${P.map((i, id) => `   x${id+1}${id+1 > 9 ? '' : ' '}  `).join('|')}|`)
    console.log(`---|${P.map(i => `--------`).join('|')}|`)
    console.log(`Pi |${P.map((i) => `  ${i.toFixed(2)}  `).join('|')}|`)
    console.log()
}
