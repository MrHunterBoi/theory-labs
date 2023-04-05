const ascii = [71, 114, 101, 101, 116, 105, 110, 103, 115]
for (const i of ascii) {
    process.stdout.write(String.fromCharCode(i))
}