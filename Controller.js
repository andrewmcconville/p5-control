class Controller {
    constructor() {
        this.position = createVector(width/2, 10);
        this.velocity = createVector(0, 0);
        this.mass = 200;
    }

    update() {
        this.position.add(this.velocity);
    }

    draw() {
        this.update();

        fill(100);
        rect(this.position.x, this.position.y, 200, 40);
    }

    repel(particle) {
        let force = p5.Vector.sub(this.position, particle.position);
        let distance = force.mag();
        let magnitude = -1 * gravity * ((this.mass * particle.mass) / (distance * distance));

        //console.log(magnitude)
        //noLoop()
        
        force.setMag(magnitude);
        particle.applyForce(force);
    }
}