let img;
let pixelArray = [];
let scaleFactor = 1; // 缩放比例，如果你图是120x120可以用原图；否则resize

function preload() {
  // 上传后的图片路径，先用站内的测试图片代替
  img = loadImage('assets\dove.jpg');
}

function setup() {
  createCanvas(120, 120);
  noLoop();
  img.resize(120, 120); // 修改成你目标像素尺寸
  image(img, 0, 0);

  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    let row = [];
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let brightness = (r + g + b) / 3;
      let value = brightness < 128 ? 1 : 0; // 黑是1，白是0
      row.push(value);
    }
    pixelArray.push(row);
  }

  console.log("Pixel array (copy this):");
  console.log(pixelArray);
}

