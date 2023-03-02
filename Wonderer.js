class Wonderer {
    constructor() {
        this.position = createVector(width/2, 120);
        this.velocity = createVector(0, 0);
        this.mass = 50;
        this.resetDistance = this.mass * 4;
    }

    update() {
        this.position.add(this.velocity);
    }

    draw() {
        this.update();

        fill(255, 127);
        //circle(this.position.x, this.position.y, this.mass);
    }

    attract(particle) {
        let force = p5.Vector.sub(this.position, particle.position);
        let distance = force.mag();
        let magnitude = gravity * ((this.mass * particle.mass) / (distance * distance));

        if(distance < 4 || distance > this.resetDistance * random(0.5, 2)) {
            particle.position = p5.Vector.add(this.position, p5.Vector.random2D().setMag(this.mass))
            particle.velocity = p5.Vector.random2D().setMag(2);
        }

        force.setMag(magnitude);
        particle.applyForce(force);
    }
}