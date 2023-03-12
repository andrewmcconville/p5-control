class DebugOverlay {
    constructor(config) {
        this.enabled = config.enabled;
        this.pointSize = config.pointSize;
        this.fontSize = config.fontSize;
        this.lineWeight = config.lineWeight;
        this.textOffset = config.textOffset;
        this.fill = config.fill;
    }

    draw() {
        push();

        //canvas center point
        strokeWeight(this.pointSize);
        stroke(0);
        point(canvasCenter.x, canvasCenter.y);

        //canvas center text
        textSize(this.fontSize);
        noStroke();
        fill(0);
        text(`x: ${canvasCenter.x.toFixed(3)}\ny: ${canvasCenter.y.toFixed(3)}`, canvasCenter.x + this.textOffset.x, canvasCenter.y + this.textOffset.y);

        //wonderer bounds
        strokeWeight(this.lineWeight);
        stroke(0);
        fill(this.fill);
        circle(canvasCenter.x, canvasCenter.y, wonderer.bounds);
        
        //wonderer center point
        strokeWeight(this.pointSize);
        stroke(0);
        point(wonderer.position.x, wonderer.position.y);

        //wonderer mass
        strokeWeight(this.lineWeight);
        fill(this.fill);
        circle(wonderer.position.x, wonderer.position.y, wonderer.mass);

        //wonderer center text
        textSize(this.fontSize);
        noStroke();
        fill(0);
        text(`x: ${wonderer.position.x.toFixed(3)}\ny: ${wonderer.position.y.toFixed(3)}`, wonderer.position.x + this.textOffset.x, wonderer.position.y + this.textOffset.y);

        //controller mass point
        strokeWeight(this.pointSize);
        stroke(0);
        point(controller.position.x, controller.position.y);

        //controller mass
        strokeWeight(this.lineWeight);
        fill(this.fill);
        circle(controller.position.x, controller.position.y, controller.mass);

        //controller mass text
        textSize(this.fontSize);
        noStroke();
        fill(0);
        text(`x: ${controller.position.x.toFixed(3)}\ny: ${controller.position.y.toFixed(3)}`, controller.position.x + this.textOffset.x, controller.position.y + this.textOffset.y);

        //controller rectangle
        push();        
        translate(controller.position.x, controller.position.y);
        rotate(controller.angle);
        strokeWeight(this.lineWeight);
        stroke(0)
        fill(this.fill);
        rect(controller.width / 2, 0, controller.width, controller.height);
        pop();

        //controller rectangle center point
        strokeWeight(this.pointSize);
        stroke(0);
        point(controller.controllerCenter.x, controller.controllerCenter.y);

        //controller rectangle center text
        noStroke();
        strokeWeight(this.pointSize);
        text(`x: ${controller.controllerCenter.x.toFixed(3)}\ny: ${controller.controllerCenter.y.toFixed(3)}`, controller.controllerCenter.x + this.textOffset.x, controller.controllerCenter.y + this.textOffset.y);
        pop();
    }
}