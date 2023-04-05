const w = 1024, h = 768, X = 45, palette = 65536;
const imageSize = X * 1024 * 8 / Math.log2(palette); 

console.log('Bits per dot:',Math.log2(palette));
console.log('Display size:', w * h, 'dots');
console.log(imageSize, 'dots needed for the image');
console.log('Image takes up', imageSize / w / h, 'space of the display');