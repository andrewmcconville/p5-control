class Controller {
    constructor() {
        this.width = 300;
        this.height = 160;
        this.position = p5.Vector.sub(wonderer.position, canvasCenter).setMag(wonderer.bounds / 2).add(canvasCenter);
        this.controllerCenter = p5.Vector.sub(this.position, canvasCenter).setMag(this.width / 2).add(this.position);
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
        this.controllerCenter = p5.Vector.sub(this.position, canvasCenter).setMag(this.width / 2).add(this.position);
        this.angle = p5.Vector.sub(this.position, wonderer.position).heading();
    }

    draw() {
        this.update();
        this.lines.forEach(line => {
            line.draw();
        });
    }

    repel(particle) {
        let force = p5.Vector.sub(this.position, particle.position);
        let distance = force.mag();
        let magnitude = -1 * gravity * ((this.mass * particle.mass) / (distance * distance));
        
        force.setMag(magnitude);
        particle.applyForce(force);
    }
}