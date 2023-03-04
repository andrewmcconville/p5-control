class Controller {
    constructor() {
        this.width = 200;
        this.height = 200;
        this.position = p5.Vector.sub(wonderer.position, canvasCenter).setMag(canvasCenter.y / 2).add(canvasCenter).add(createVector(0, 0));
        this.velocity = createVector(0, 0);
        this.forcePosition = p5.Vector.add(this.position, createVector(0, 0));
        this.mass = 250;
        this.radius = canvasCenter.y;
    }

    update() {
        this.position = p5.Vector.sub(wonderer.position, canvasCenter).setMag(canvasCenter.y / 2).add(canvasCenter).add(createVector(0, 0));
        this.position.add(this.velocity);
        this.forcePosition = p5.Vector.add(this.position, createVector(0, 0));
    }

    draw() {
        this.update();

        push();
        fill(100);
        //rect(this.position.x, this.position.y, this.width, this.height);
        stroke(0);
        strokeWeight(8);
        point(this.forcePosition.x, this.forcePosition.y);
        fill(0, 0);
        strokeWeight(1);
        circle(canvasCenter.x, canvasCenter.y, this.radius);
        translate(this.position.x, this.position.y);
        rotate(p5.Vector.sub(this.position, wonderer.position).heading());
        fill(100, 100);
        rect(this.height / 2, 0, this.width, this.height);
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