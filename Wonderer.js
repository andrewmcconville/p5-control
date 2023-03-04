class Wonderer {
    constructor() {
        this.position = createVector((width / 2) + 10, (height / 2) - 10);
        this.velocity = createVector(0, 0.10);
        this.mass = 50;
        this.particleResetMinDistance = 4;
        this.particleResetMaxDistanceMultiplier = 6;
        this.particleResetMaxDistance = this.mass * this.particleResetMaxDistanceMultiplier;
    }

    update() {
        this.position.add(this.velocity);
    }

    draw() {
        this.update();

        //fill(255, 127);
        //circle(this.position.x, this.position.y, this.mass);
    }

    attract(particle) {
        let force = p5.Vector.sub(this.position, particle.position);
        let distance = force.mag();
        let magnitude = gravity * ((this.mass * particle.mass) / (distance * distance));

        if(distance < this.particleResetMinDistance || distance > this.particleResetMaxDistance * random(0.5, 2)) {
            particle.position = p5.Vector.add(wonderer.position, p5.Vector.random2D().setMag(random(wonderer.mass * 0.5, wonderer.mass * 2)));
            particle.velocity = p5.Vector.random2D().setMag(2);
        }

        force.setMag(magnitude);
        particle.applyForce(force);
    }
}