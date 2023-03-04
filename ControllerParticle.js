class ControllerParticle {
    constructor(config) {
        this.parent = config.parent;
        this.offset = config.offset;
        this.width = 200;
        this.height = 20;
        this.speed = 0.25//random(2, 4);
        this.position = createVector((this.width - this.speed) * 1.5, this.height * this.offset + this.height / 2);
    }

    update() {
        if(this.width <= this.speed) {
            this.width = 200;
            this.speed = 0.25//random(2, 4);
        }

        this.position = createVector((this.width - this.speed) * 1.5, this.height * this.offset + this.height / 2);
        this.width -= this.speed;
    }

    draw() {
        this.update();

        push();
        translate(this.parent.position.x, this.parent.position.y);
        rotate(this.parent.angle);
        fill(200);
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    }
}