// Global variables
let img;                  // The original image
let dots = [];            // Array to store dot objects
let xStep = 10;           // Horizontal spacing between dots
let yStep = 10;           // Vertical spacing between dots
let imgScale = 1;         // Scale factor of the image
let imgXOffset = 0;       // X offset for centering image
let imgYOffset = 0;       // Y offset (not used here but prepared for future layout)

function preload() {
  // Load image before setup starts
  img = loadImage('assets/Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
}

function setup() {
  // Create canvas that fills the window
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Initial calculation for positioning and dot generation
  calculateImageAndDots();
}

function draw() {
  background(255);

  // Center the image before drawing dots
  push();
  translate(imgXOffset, imgYOffset);
  for (let dot of dots) {
    dot.display();
  }
  pop();
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageAndDots(); // Recalculate image and dots
}

// Recalculate image scaling and recreate dot data
function calculateImageAndDots() {
  dots = [];

  // Resize image to fit height, keep aspect ratio
  img.resize(0, height);
  imgScale = height / img.height;

  // Center image horizontally
  imgXOffset = (width - img.width) / 2;
  imgYOffset = 0;

  // Loop through pixels at steps and create dot instances
  for (let i = 0; i < img.width; i += xStep) {
    for (let j = 0; j < img.height; j += yStep) {
      let pixelColor = img.get(i, j);
      dots.push(new Dot(i, j, pixelColor));
    }
  }
}

// Dot class: represents a single pixel dot derived from the image
class Dot {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;

    // Get brightness from pixel color
    this.brightness = brightness(color(col));

    // Map brightness to circle size (inverse mapping)
    this.size = map(this.brightness, 0, 255, 20, 0);
  }

  // Display the dot on the canvas
  display() {
    fill(this.col);
    circle(this.x, this.y, this.size);
  }
}