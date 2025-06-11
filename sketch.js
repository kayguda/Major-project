let imgOriginal;    // The original image will not be modified
let img;            // Current drawing image (copy original image each time)
let dots = [];      // Stores all Dot instances
let xStep = 10;     // Lateral pixel spacing
let yStep = 10;     // Vertical pixel spacing
let imgScale = 1;   // Image zoom ratio
let imgXOffset = 0; // Image center offset
let imgYOffset = 0; // Reserve the vertical offset
let snakeSize = 20; // Size of the snake

let currentRow = 0; // Keeps track of the current row the snake is on
let rowDirection = 'RIGHT'; // Direction of snake in the row (right or left)

let snakeSpeedSlider;  // Slider for controlling snake speed
let snakeSpeed = 2;    // Default snake speed


function preload() {
  // Load the original image only once
  imgOriginal = loadImage('assets/Piet_Mondrian Broadway_Boogie_Woogie.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  calculateImageAndDots(); // Initialize the image and Dot data

  // Initialize the slider for controlling snake speed
  snakeSpeedSlider = createSlider(1, 20, 2);  // Min: 1, Max: 20, Default: 5
  snakeSpeedSlider.position(width + 20, height / 2);  // Position the slider
  snakeSpeedSlider.style('width', '200px');  // Adjust the width of the slider

  let speed = createDiv("SnakeSpeed");
  speed.position(width+80, height/2 -20);
  snake.push(createVector(dots[0].x, dots[0].y)); // Start snake at the first dot
}

function draw() {
  background(255);
  for (let dot of dots) {
    dot.display();
  }

  // Move the snake automatically
  moveSnake();
  drawSnake();
  checkDotCollision();
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


class Dot {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.originalColor = color;
    this.color = color;
    this.size = size; // Adjusted size range
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);  // Draw the dot
  }

  // Method to check if snake eats the dot
 checkIfEaten(snakeHead) {
    let d = dist(this.x, this.y, snakeHead.x, snakeHead.y);

    let detectionRange = this.size + snakeSpeed;
    if (d < detectionRange / 2) {
      // Check if the dot is red or blue and change to yellow
      let c = this.originalColor;
      // Check if the dot is "close" to red or blue within a range
      if (dist(red(c), green(c), blue(c), 170, 57, 43) < 50) {
        this.color = color(234, 211, 45);  // Turn red to yellow
      } else if (dist(red(c), green(c), blue(c), 71, 107, 191) < 50) {
        this.color = color(234, 211, 45); 
      } else if (dist(red(c), green(c), blue(c), 54, 60, 136) < 50) {
        this.color = color(234, 211, 45);  
      } else if (dist(red(c), green(c), blue(c), 62, 79, 46) < 50) {
        this.color = color(234, 211, 45); 
      } else if (dist(red(c), green(c), blue(c), 180, 105, 87) < 50) {
        this.color = color(234, 211, 45); 
      } else if (dist(red(c), green(c), blue(c), 93, 91, 142) < 50) {
        this.color = color(222, 198, 36); 
      } else if (dist(red(c), green(c), blue(c), 113, 92, 84) < 50) {
        this.color = color(222, 198, 36);  
      } else if (dist(red(c), green(c), blue(c), 82, 91, 98) < 50) {
        this.color = color(222, 198, 36); 
      }
      return true;
    }
    return false;
  }
}

// Move the snake automatically in a zigzag pattern
function moveSnake() {
  let head = snake[snake.length - 1].copy();  // Copy the last snake position

  // Move the snake in the specified direction
  if (rowDirection === 'RIGHT') head.x += snakeSpeed;  // Use snakeSpeed from the slider
  if (rowDirection === 'LEFT') head.x -= snakeSpeed;
  if (head.x >= width || head.x <= 0) {  // When snake reaches the edge of the row
    currentRow++;
    rowDirection = (rowDirection === 'RIGHT') ? 'LEFT' : 'RIGHT';  // Change direction (zigzag)
    head.y += yStep;  // Move down one row
  }

  snake.push(head);  // Add the new head to the snake
  snake.shift();  // Remove the tail to simulate movement
}

// Draw the snake on the canvas
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    fill(0);
    ellipse(snake[i].x, snake[i].y, snakeSize, snakeSize);  // Draw each part of the snake
  }
}

// Check if the snake eats any dots
function checkDotCollision() {
  let head = snake[snake.length - 1];  // Get the snake's head

  // Check for collision with dots
  for (let i = dots.length - 1; i >= 0; i--) {
    if (dots[i].checkIfEaten(head)) {
    }
  }
}

