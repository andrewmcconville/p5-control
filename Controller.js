class Controller {
    constructor() {
        this.width = 300;
        this.height = 160;
        this.position = p5.Vector.sub(wonderer.position, canvasCenter).setMag(canvasCenter.y / 2).add(canvasCenter);
        this.forcePosition = p5.Vector.add(this.position, createVector(0, 0));
        this.mass = 250;
        this.radius = canvasCenter.y;
        this.angle = p5.Vector.sub(this.position, wonderer.position).heading();
        this.lineCount = 5;
        this.lines = [];

        this.setup();
    }

    setup() {
        for(let i = 0; i < this.lineCount; i++) {
            this.lines.push(new ControllerParticle({
                parent: this,
                offset: i,
            }));
        }
    }

    update() {
        this.position = p5.Vector.sub(wonderer.position, canvasCenter).setMag(canvasCenter.y / 2).add(canvasCenter).add(createVector(0, 0));
        this.angle = p5.Vector.sub(this.position, wonderer.position).heading();
        this.forcePosition = p5.Vector.add(this.position, createVector(0, 0));
    }

    draw() {
        this.update();
        this.lines.forEach(line => {
            line.draw();
        });

        push();
        strokeWeight(4);
        point(this.forcePosition.x, this.forcePosition.y);
        strokeWeight(1);
        circle(this.forcePosition.x, this.forcePosition.y, this.mass);

        translate(this.position.x, this.position.y);
        rotate(this.angle);
        strokeWeight(4);
        point(this.width / 2, 0);
        strokeWeight(1);
        rect(this.width / 2, 0, this.width, this.height);
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