let pixelSize = 4;

function setup() {
  createCanvas(480, 480);
  noStroke();
}

function draw() {
  background(255);

  for (let y = 0; y < dovePixels.length; y++) {
    for (let x = 0; x < dovePixels[y].length; x++) {
      if (dovePixels[y][x] === 1) {
        fill(0);  
        rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }

  for (let y = 0; y < oliveBranchPixels.length; y++) {
    for (let x = 0; x < oliveBranchPixels[y].length; x++) {
      if (oliveBranchPixels[y][x] === 1) {
        fill(0, 150, 0); 
        rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }
}
