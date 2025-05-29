let img;
let dots = [];
let xstep = 10;
let ystep = 10;
let imgScale = 1;
let imgXOffset = 0;
let imgYOffset = 0;

function preload() {
  img = loadImage('assets/Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  calculateImageAndDots();
}

function draw() {
  background(255);
  push();
  translate(imgXOffset, imgYOffset);
  for (let dot of dots) {
    dot.display();
  }
  pop();
}

// 自动重设画布与图像缩放
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageAndDots();
}

// 重新计算图像缩放和 Dot 点阵
function calculateImageAndDots() {
  dots = [];

  // 按高等比缩放图片（高度占满画布），同时计算 x 居中偏移
  img.resize(0, height);
  imgScale = height / img.height;
  imgXOffset = (width - img.width) / 2;
  imgYOffset = 0;

  for (let i = 0; i < img.width; i += xstep) {
    for (let j = 0; j < img.height; j += ystep) {
      let col = img.get(i, j);
      dots.push(new Dot(i, j, col));
    }
  }
}

class Dot {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.brightness = brightness(color(col));
    this.size = map(this.brightness, 0, 255, 20, 0);
  }

  display() {
    fill(this.col);
    circle(this.x, this.y, this.size);
  }
}