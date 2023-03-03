class Controller {
    constructor() {
        this.position = createVector(width/2, 220);
        this.velocity = createVector(0, 0);
        this.width = 200;
        this.height = 200;
        this.forcePosition = p5.Vector.add(this.position, createVector(0, this.height / 2));
        this.mass = 200;
    }

    update() {
        this.position.add(this.velocity);
        this.forcePosition = p5.Vector.add(this.position, createVector(0, this.height / 2));
    }

    draw() {
        this.update();

        push();
        fill(100);
        rect(this.position.x, this.position.y, this.width, this.height);
        stroke(0);
        strokeWeight(8);
        point(this.forcePosition.x, this.forcePosition.y)
        pop();
    }

    repel(particle) {
        let force = p5.Vector.sub(this.forcePosition, particle.position);
        let distance = force.mag();
        let magnitude = -1 * gravity * ((this.mass * particle.mass) / (distance * distance));
        
        force.setMag(magnitude);
        particle.applyForce(force);
    }
}