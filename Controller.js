class Controller {
    constructor() {
        this.width = 300;
        this.height = 160;
        this.position = p5.Vector.sub(wonderer.position, canvasCenter).setMag(wonderer.bounds / 2).add(canvasCenter);
        this.controllerCenter = p5.Vector.sub(wonderer.position, canvasCenter).setMag(canvasCenter.y / 2 + this.width / 2).add(canvasCenter);
        this.mass = 250;
        this.radius = canvasCenter.y;
        this.angle = p5.Vector.sub(this.position, wonderer.position).heading();
        this.lineCount = 7;
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
        this.position = p5.Vector.sub(wonderer.position, canvasCenter).setMag(wonderer.bounds / 2).add(canvasCenter);
        this.controllerCenter = p5.Vector.sub(wonderer.position, canvasCenter).setMag(canvasCenter.y / 2 + this.width / 2).add(canvasCenter);
        this.angle = p5.Vector.sub(this.position, wonderer.position).heading();
    }

    draw() {
        this.update();
        this.lines.forEach(line => {
            line.draw();
        });

        push();
        strokeWeight(4);
        point(this.position.x, this.position.y);
        strokeWeight(1);
        fill(255, 255, 255, 32);
        circle(this.position.x, this.position.y, this.mass);
        push();
        noStroke();
        fill(0);
        textSize(14);
        text(`x: ${this.position.x}\ny: ${this.position.y}`, this.position.x + 6, this.position.y + 12);
        text(`x: ${this.controllerCenter.x}\ny: ${this.controllerCenter.y}`, this.controllerCenter.x + 6, this.controllerCenter.y + 12);
        pop();
        
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        strokeWeight(4);
        point(this.width / 2, 0);
        strokeWeight(1);
        fill(255, 255, 255, 32);
        rect(this.width / 2, 0, this.width, this.height);
        pop();
    }

    repel(particle) {
        let force = p5.Vector.sub(this.position, particle.position);
        let distance = force.mag();
        let magnitude = -1 * gravity * ((this.mass * particle.mass) / (distance * distance));
        
        force.setMag(magnitude);
        particle.applyForce(force);
    }
}