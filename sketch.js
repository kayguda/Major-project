let img;
let dots = [];
let xstep = 10;
let ystep = 10;

function preload() {
  img = loadImage('assets/Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
}

function setup() {
  createCanvas(1000, 1000);
  noStroke();
  img.resize(0, height);

  // 逐点构建 Dot 对象
  for (let i = 0; i < img.width; i += xstep) {
    for (let j = 0; j < img.height; j += ystep) {
      let col = img.get(i, j);
      dots.push(new Dot(i, j, col));
    }
  }
}

function draw() {
  background(255);
  for (let dot of dots) {
    dot.display();
  }
  noLoop(); // 只绘制一次
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