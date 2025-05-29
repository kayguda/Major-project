let imgOriginal;    // 原始图像，不会被修改
let img;            // 当前绘图图像（每次复制原始图像）
let dots = [];      // 储存所有 Dot 实例
let xStep = 10;     // 横向像素间隔
let yStep = 10;     // 纵向像素间隔
let imgScale = 1;   // 图像缩放比例
let imgXOffset = 0; // 图像居中偏移量
let imgYOffset = 0; // 预留纵向偏移

function preload() {
  // 只加载一次原图
  imgOriginal = loadImage('assets/Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  calculateImageAndDots(); // 初始化图像和 Dot 数据
}

function draw() {
  background(255);
  for (let dot of dots) {
    dot.display();
  }
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageAndDots(); // 每次窗口变化时重建图像与 dots
}

function calculateImageAndDots() {
  dots = [];

  // 每次从原图复制出一个新图像对象用于缩放
  img = imgOriginal.get();
  img.resize(0, height); // 按高度缩放，保持宽高比

  imgScale = height / img.height;
  imgXOffset = (width - img.width) / 2;
  imgYOffset = 0; // 当前未使用，但可用于后续拓展

  for (let i = 0; i < img.width; i += xStep) {
    for (let j = 0; j < img.height; j += yStep) {
      let pixelColor = img.get(i, j);
      let bri = brightness(pixelColor);
      let size = map(bri, 0, 255, 20, 0);
      dots.push(new Dot(i + imgXOffset, j + imgYOffset, pixelColor, size));
    }
  }
}
