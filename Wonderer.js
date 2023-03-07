class Wonderer {
    constructor() {
        this.position = createVector((width / 2) + 100, (height / 2) - 100);
        this.velocity = createVector(0, 0.0);
        this.mass = 50;
        this.bounds = 500;
        this.particleResetMinDistance = 4;
        this.particleResetMaxDistanceMultiplier = 6;
        this.particleResetMaxDistance = this.mass * this.particleResetMaxDistanceMultiplier;
    }

    update() {
        this.position.add(this.velocity);
    }

    draw() {
        this.update();

        push();
        strokeWeight(4);
        point(canvasCenter.x, canvasCenter.y);
        strokeWeight(1);
        fill(255, 255, 255, 32);
        circle(canvasCenter.x, canvasCenter.y, this.bounds);
        
        noStroke();
        fill(0);
        textSize(14);
        text(`x: ${canvasCenter.x}\ny: ${canvasCenter.y}`, canvasCenter.x + 6, canvasCenter.y + 12);

        stroke(0);
        strokeWeight(4);
        point(this.position.x, this.position.y);
        strokeWeight(1);
        fill(255, 255, 255, 32);
        circle(this.position.x, this.position.y, this.mass);

        noStroke();
        fill(0);
        textSize(14);
        text(`x: ${this.position.x}\ny: ${this.position.y}`, this.position.x + 6, this.position.y + 12);
        pop();
    }

    attract(particle) {
        let force = p5.Vector.sub(this.position, particle.position);
        let distance = force.mag();
        let magnitude = gravity * ((this.mass * particle.mass) / (distance * distance));

        if(distance < this.particleResetMinDistance || distance > this.particleResetMaxDistance * random(0.5, 2)) {
            particle.position = p5.Vector.add(wonderer.position, p5.Vector.random2D().setMag(random(wonderer.mass * 0.5, wonderer.mass * 2)));
            particle.velocity = p5.Vector.random2D().setMag(2);
        }

        force.setMag(magnitude);
        particle.applyForce(force);
    }
}