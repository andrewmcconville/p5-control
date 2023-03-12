class Wonderer {
    constructor() {
        this.position = createVector((width / 2) + 100, (height / 2) - 100);
        this.velocity = createVector(0, 0.01);
        this.mass = 50;
        this.bounds = 500;
        this.particleResetMinDistance = 4;
        this.particleResetMaxDistanceMultiplier = 6;
        this.particleResetMaxDistance = this.mass * this.particleResetMaxDistanceMultiplier;
        this.particleCount = 500;
        this.particles = [];

        this.setup();
    }

    setup() {
        for(let i = 0; i < this.particleCount; i++) {
            this.particles.push(new WondererParticle({
                position: p5.Vector.add(this.position, p5.Vector.random2D().setMag(random(this.mass * 0.5, this.mass * 2))),
                velocity: p5.Vector.random2D().setMag(random(2)),
                parent: this,
            }));
          }
    }

    update() {
        this.position.add(this.velocity);
    }

    draw() {
        this.update();
    }

    attract(particle) {
        let direction = p5.Vector.sub(this.position, particle.position);
        let distance = direction.mag();
        let magnitude = gravity * ((this.mass * particle.mass) / (distance * distance));
        let force = direction.copy();

        if(distance < this.particleResetMinDistance || distance > this.particleResetMaxDistance * random(0.5, 2)) {
            particle.position = p5.Vector.add(wonderer.position, p5.Vector.random2D().setMag(random(wonderer.mass * 0.5, wonderer.mass * 2)));
            particle.velocity = p5.Vector.random2D().setMag(2);
        }

        force.setMag(magnitude);
        particle.applyForce(force);
    }
}