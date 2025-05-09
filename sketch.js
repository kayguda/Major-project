let sourceImage;
let pixelArray = [];

function preload() {
  sourceImage = loadImage('assets/dove_original.jpg'); // 修正路径
}

function setup() {
  let canvas = createCanvas(240, 120);
  canvas.parent('canvas-container'); // ✅ 这一句是关键
  pixelArray = extractPixelData(sourceImage);
  drawPixels(pixelArray, 0, 0);
}


function extractPixelData(img) {
  let w = 120;
  let h = 120;
  img.resize(w, h);
  img.loadPixels();
  let result = [];

  for (let y = 0; y < h; y++) {
    let row = [];
    for (let x = 0; x < w; x++) {
      let index = (y * w + x) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let val = 0;
      if (r > 180 && g > 180 && b > 180) {
        val = 1;
      } else if (g > 100 && g > r && g > b) {
        val = 2;
      }
      row.push(val);
    }
    result.push(row);
  }

  return result;
}

function drawPixels(arr, offsetX, offsetY) {
  let scale = 2;
  noStroke();
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      let v = arr[y][x];
      if (v === 1) fill(255);          // Dove: white
      else if (v === 2) fill(0, 255, 0); // Olive branch: green
      else fill(0);                    // Background: black
      rect(x * scale + offsetX, y * scale + offsetY, scale, scale);
    }
  }
}


