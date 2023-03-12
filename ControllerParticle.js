class ControllerParticle {
    constructor(config) {
        this.parent = config.parent;
        this.offset = config.offset;
        this.width = 200;
        this.height = 20;
        this.position = createVector((this.width - this.velocity) * 2, (this.height * this.offset) + (this.height / 2) - (this.parent.lineCount * this.height / 2));
        this.velocity = random(0, 2);
        this.acceleration = random(0, 0.25);
    }

    update() {
        if(this.width <= this.velocity) {
            this.width = 200;
            this.velocity = random(0, 2);
            this.acceleration = random(0, 0.25);
        }

        this.velocity += this.acceleration;
        this.position = createVector((this.width - this.velocity) * 2, (this.height * this.offset) + (this.height / 2) - (this.parent.lineCount * this.height / 2));
        this.width -= this.velocity;
    }

    draw() {
        this.update();

        push();
        if(debugOverlay.enabled) {
            strokeWeight(1);
            stroke(0)
        }
        translate(this.parent.position.x, this.parent.position.y);
        rotate(this.parent.angle);
        fill(255, 255, 255, 32);
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    }
}