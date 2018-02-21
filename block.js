class Block {
    constructor (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.health = random([1, 2, 3]);
        this.red = 0; 
        this.green = 0;
        this.blue = 0;
    }

    draw() {
        if (this.health > 2) {
            this.red = 0; 
            this.green = 255;
            this.blue = 0;
        } else if (this.health == 2) {
            this.red = 0; 
            this.green = 0;
            this.blue = 255;
        } else {
            this.red = 255;
            this.green = 0;
            this.blue = 0;
        }
        push();
        noStroke();
        fill(this.red, this.green, this.blue);
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
        // textSize(15);
        // textAlign(CENTER);
        // fill(0, 255, 0);
        // text(this.damageValue, this.x, this.y);
        pop();
    }

    hitbox() {
        //console.log("width:", width, "height:", height);
        return {x1: this.x-this.width/2, x2: this.x+this.width/2, y1: this.y-this.height/2, y2: this.y+this.height/2, xm: this.x, ym: this.y, w: this.width, h: this.height};
    }

    hit () {
        console.log(col.dx, col.dy);
            if (col.dx !== 0) {
                b.invertVx();
            }
            if (col.dy !== 0) {
                b.invertVy();
            }
            if (col.dx === 0 && col.dy === 0) {
                errorScreen();
            }

            if (abs(b.vx) < 1 || abs(b.vy) < 1) {
                console.log(b.vx, b.vy);
                errorScreen();
            }
            //noLoop();
            this.health--;
            score++;
            if (this.health < 1) {
                blocks = blocks.filter(b => this !== b);
            console.log(blocks.length)
            }
    }
}
