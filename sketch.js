let gravity;
let canvasCenter;
let wonderer;
let controller;
let debugOverlay;
let debugButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvasCenter = createVector(width / 2, height / 2);
  rectMode(CENTER);
  noStroke();
  noFill();

  gravity = 3;
  wonderer = new Wonderer();
  controller = new Controller();
  debugOverlay = new DebugOverlay({
    enabled: true,
    pointSize: 4,
    fontSize: 14,
    lineWeight: 1,
    textOffset: createVector(6, 12),
    fill: color(255, 255, 255, 32),
  });  
  debugButton = createButton('toggle debug');
  debugButton.position(4, 4);
  debugButton.mousePressed(toggleDebug);
}

function toggleDebug(){
  debugOverlay.toggleDebug();
}

function draw() {
  background(200);  
  
  wonderer.particles.forEach(particle => {
    wonderer.attract(particle);
    controller.repel(particle);
    particle.draw();
  });

  wonderer.draw();
  controller.draw();

  if(debugOverlay.enabled) {
    debugOverlay.draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}