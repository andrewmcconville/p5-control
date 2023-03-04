let gravity = 3;
let canvasCenter;
let wonderer;
let particleCount = 500;
let particles = [];
let controller;

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvasCenter = createVector(width / 2, height / 2);
  rectMode(CENTER);
  noStroke();
  stroke(0);
  noFill();
  wonderer = new Wonderer();
  controller = new Controller();

  for(let i = 0; i < particleCount; i++) {
    particles.push(new WondererParticle({
        position: p5.Vector.add(wonderer.position, p5.Vector.random2D().setMag(random(wonderer.mass * 0.5, wonderer.mass * 2))),
        velocity: p5.Vector.random2D().setMag(random(2)),
        parent: wonderer,
    }));
  }
}

function draw() {
  background(200);  
  
  push();
  strokeWeight(4);
  point(canvasCenter.x, canvasCenter.y);
  strokeWeight(1);
  circle(canvasCenter.x, canvasCenter.y, canvasCenter.y);
  pop();

  wonderer.draw();
  controller.draw();
  particles.forEach(particle => {
    wonderer.attract(particle);
    controller.repel(particle);
    particle.draw();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
