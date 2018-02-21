class Ball {
    constructor (xStart, yStart, vxStart, vyStart, width, height) {
        this.x = xStart;
        this.y = yStart;
        this.vx = vxStart;
        this.vy = vyStart;
        this.width = width;
        this.height = height;
    }

    draw() {
        push();
        rectMode(CENTER);
        rect(this.x, this.y, 10, 10);
        pop();
        this.x += this.vx;
        this.y += this.vy;
        if (this.x > WIDTH-this.width/2 || this.x < this.width/2) {
            this.vx = -this.vx;
        }
        if (this.y < this.height/2) {
            this.vy = -this.vy;
        }
        else if (this.y > HEIGHT-this.height/2) {
            gameOverScreen();
        }
    }

    hitbox() {
        return {x1: this.x-this.width/2, x2: this.x+this.width/2, y1: this.y-this.height/2, y2: this.y+this.height/2, xm: this.x, ym: this.y, w: this.width, h: this.height};
    }

    invertVx() {
        this.vx = -this.vx;
    }

    invertVy() {
        this.vy = -this.vy;
    }
}