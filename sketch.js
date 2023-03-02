let gravity = 3;
let wonderer;
let particleCount = 500;
let particles = [];
let controller;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  noFill();
  wonderer = new Wonderer();
  controller = new Controller();

  for(let i = 0; i < particleCount; i++) {
    particles.push(new WondererParticle({
        position: p5.Vector.add(wonderer.position, p5.Vector.random2D().setMag(random(wonderer.mass * 0.125, wonderer.mass * 1))),
        velocity: p5.Vector.random2D().setMag(random(2)),
        parent: wonderer,
    }));
  }
}

function draw() {
  background(200);

  controller.draw();
  wonderer.draw();
  particles.forEach(particle => {
    wonderer.attract(particle);
    controller.repel(particle);
    particle.draw();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
