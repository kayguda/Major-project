let sourceImage;
let pixelArray = [];

function preload() {
  sourceImage = loadImage("assets/dove_original.jpg");
}

function setup() {
  createCanvas(600, 600); // 大画布
  noSmooth(); // 关闭插值
  noLoop();

  sourceImage.resize(120, 120); // 压缩至目标分辨率
  sourceImage.loadPixels();

  pixelArray = [];

  for (let y = 0; y < sourceImage.height; y++) {
    let row = [];
    for (let x = 0; x < sourceImage.width; x++) {
      let index = (y * sourceImage.width + x) * 4;
      let r = sourceImage.pixels[index];
      let g = sourceImage.pixels[index + 1];
      let b = sourceImage.pixels[index + 2];

      let brightness = (r + g + b) / 3;
      let val = 0;

      if (brightness > 150 && brightness < 230) {
        val = 1; // 黑色线
      } else if (g > 120 && g > r + 30 && g > b + 30) {
        val = 2; // 绿色橄榄枝
      }

      row.push(val);
    }
    pixelArray.push(row);
  }

  drawPixels(pixelArray, 0, 0, 5); // 缩放倍数：5x
}

function drawPixels(arr, offsetX, offsetY, scale) {
  noStroke();
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      let v = arr[y][x];
      if (v === 1) fill(0);          // 黑线条
      else if (v === 2) fill(0, 180, 0); // 绿色
      else fill(255);               // 背景
      rect(x * scale + offsetX, y * scale + offsetY, scale, scale);
    }
  }
}









