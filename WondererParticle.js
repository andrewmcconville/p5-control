class WondererParticle {
    constructor(config) {
        this.position = config.position;
        this.velocity = config.velocity;
        this.acceleration = createVector(0, 0);
        this.mass = 1;
        this.maxVelocity = 3;
        this.opacity = 255;
        this.size = 10;
        this.parent = config.parent;
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxVelocity);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        this.opacity = 200 - p5.Vector.sub(this.parent.position, this.position).mag();
    }

    draw() {
        this.update();

        push();
        fill(255, this.opacity - 20);
        rect(this.position.x, this.position.y, this.size);
        pop();
    }
}