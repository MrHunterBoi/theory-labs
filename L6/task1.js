const dec = [216, 336, 741.125, 712.375, 184.14]

dec.forEach(i => convert(i))

function convert(n) {
    console.log(`\n${n}:\n`);
    console.log(`Binary: ${n.toString(2)}`);
    console.log(`Octal: ${n.toString(8)}`);
    console.log(`Hexadecimal: ${n.toString(16)}`);
}