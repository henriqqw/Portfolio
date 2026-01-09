const fs = require('fs');
const { createCanvas } = require('canvas');

// Create 16x16 canvas
const canvas = createCanvas(16, 16);
const ctx = canvas.getContext('2d');

// Define the "C" pattern (16x16)
const pattern = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0],
  [0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0],
  [0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0],
  [0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0],
  [0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0],
  [0,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0]
];

// Fill the canvas based on the pattern
for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    if (pattern[i][j]) {
      // Use the accent color from your site: #7cff8b
      ctx.fillStyle = '#7cff8b';
    } else {
      // Use the background color from your site: #0b0f0c
      ctx.fillStyle = '#0b0f0c';
    }
    ctx.fillRect(j, i, 1, 1);
  }
}

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('favicon/favicon-16x16.png', buffer);

// Also create a 32x32 version
const canvas32 = createCanvas(32, 32);
const ctx32 = canvas32.getContext('2d');

for (let i = 0; i < 16; i++) {
  for (let j = 0; j < 16; j++) {
    if (pattern[i][j]) {
      ctx32.fillStyle = '#7cff8b';
    } else {
      ctx32.fillStyle = '#0b0f0c';
    }
    ctx32.fillRect(j * 2, i * 2, 2, 2);
  }
}

const buffer32 = canvas32.toBuffer('image/png');
fs.writeFileSync('favicon/favicon-32x32.png', buffer32);

console.log('Favicon files created successfully!');