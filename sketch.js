let imgOriginal;    // The original image will not be modified
let img;            // Current drawing image (copy original image each time)
let dots = [];      // Stores all Dot instances
let xStep = 10;     // Lateral pixel spacing
let yStep = 10;     // Vertical pixel spacing
let imgScale = 1;   // Image zoom ratio
let imgXOffset = 0; // Image center offset
let imgYOffset = 0; // Reserve the vertical offset

function preload() {
  // Load the original image only once
  imgOriginal = loadImage('assets/Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  calculateImageAndDots(); // Initialize the image and Dot data
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
  calculateImageAndDots(); // Reconstruct the image with dots each time the window changes
}

function calculateImageAndDots() {
  dots = [];

  // Each time a new image object is copied from the original image, it is used for scaling
  img = imgOriginal.get();
  img.resize(0, height); // Scale by height, keeping the aspect ratio

  imgScale = height / img.height;
  imgXOffset = (width - img.width) / 2;
  imgYOffset = 0; // Not currently used, but could be used in future extensions

  for (let i = 0; i < img.width; i += xStep) {
    for (let j = 0; j < img.height; j += yStep) {
      let pixelColor = img.get(i, j);
      let bri = brightness(pixelColor);
      let size = map(bri, 0, 255, 20, 0);
      dots.push(new Dot(i + imgXOffset, j + imgYOffset, pixelColor, size));
    }
  }
}
