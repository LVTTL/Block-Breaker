class Racket {
    constructor (width, height) {
        this.width = width;
        this.height = height;
        this.y = HEIGHT - height/2;
        this.x = WIDTH/2;
    }

    draw() {
        this.x = mouseX;
        push();
        rectMode(CENTER);
        noStroke();
        rect(this.x, this.y, this.width, this.height)
        pop();
    }

    hitbox() {
        return {x1: this.x-this.width/2, x2: this.x+this.width/2, y1: this.y-this.height/2, y2: this.y+this.height/2, xm: this.x, ym: this.y, w: this.width, h: this.height};
    }
}