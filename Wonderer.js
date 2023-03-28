class Wonderer {
    constructor() {
        this.position = createVector((width / 2), (height / 2));
        this.velocity = createVector(1.00, 1.00);
        //this.acceleration = createVector(0, 0);
        this.mass = 50;
        this.bounds = (windowWidth < windowHeight ? windowWidth : windowHeight) - 100;
        this.bounceDistance = 10;
        this.particleResetMinDistance = 4;
        this.particleResetMaxDistanceMultiplier = 6;
        this.particleResetMaxDistance = this.mass * this.particleResetMaxDistanceMultiplier;
        this.particleCount = 400;
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
        
        // console.log(`velocity: ${this.velocity}`);
        // console.log(`heading: ${this.velocity.heading()}`);
        // console.log(`distance: ${p5.Vector.sub(this.position, canvasCenter).mag()}`);
    }

    update() {
        //this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        if(p5.Vector.sub(this.position, canvasCenter).mag() > ((this.bounds / 2) - this.bounceDistance)) {
            let randomDirection = random() > 0.5 ? -1 : 1;
            this.velocity.setHeading(this.velocity.heading() + (PI) + (PI/36 * randomDirection));
            this.position = p5.Vector.sub(wonderer.position, canvasCenter).setMag((wonderer.bounds / 2) - this.bounceDistance).add(canvasCenter);
            // console.log(`velocity: ${this.velocity}`);
            // console.log(`heading: ${this.velocity.heading()}`);
            //noLoop();
        }

        //this.acceleration.mult(0);
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