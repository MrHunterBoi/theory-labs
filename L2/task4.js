const w = 640, h = 480, k = 4, palette = 65536;

console.log('Bits per dot:',Math.log2(palette));
console.log('Display size:', w * h, 'dots');
console.log('Image size:', w * h / k, 'dots');
console.log(w * h / k * Math.log2(palette) / 8, 'bytes needed for the image');