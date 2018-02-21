
const WIDTH = 500;
const HEIGHT = 500;

var score = 0;
var paused = false;

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


let r = new Racket(50, 10);
let b = new Ball(200, 400, 3, 2, 10, 10);

let blocks = [];

function setup() {
    createCanvas(500, 500);
    offset = 50;
    xStep = 100;
    yStep = 30;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 7; j++) {
            blocks.push(new Block(offset+i*xStep, offset+j*yStep, 60, 20));
        }
    }
}

function draw() {
    background(200);

    r.draw();
    collision = checkCollision(r.hitbox(), b.hitbox());
    if (collision !== 0) {
        // console.log("collision detected, ", collision);
        b.invertVy();
        if (b.vx > 0 && col.dx < 0 ||b.vx < 0 && col.dx > 0) {
            b.invertVx();
        }
    }
    blocks.forEach(block => {
        col = checkCollision(block.hitbox(), b.hitbox());
        if (col !== 0) {
            block.hit();
        } else {
            block.draw();
        }
    });
    b.draw();
    document.getElementById("score").innerText = score;
    if (paused) {
        pauseScreen();
    }
    if (blocks.length === 0) {
        winningScreen();
    }
}

function checkCollision(a, b) {
    //if (b.x2 > a.x1 && b.x2 < a.x2 && (b.y2 > a.y1 && b.y2 < a.y2 || b.y2 > a.y1 && b.y2 < a.y2) 
    // || b.x1 > a.x1 && b.x1 < a.x2 && (b.y2 > a.y1 && b.y2 < a.y2 || b.y2 > a.y1 && b.y2 < a.y2)) {
    if (b.ym+b.h/2 >= a.ym-a.h/2 && b.ym-b.h/2 <= a.ym+a.h/2 && b.xm+b.w/2 >= a.xm-a.w/2 && b.xm-b.w/2 <= a.xm+a.w/2) {
        // console.log("a.x1", a.x1, "a.x2", a.x2, "b.x1", b.x1, "b.x2", b.x2);
        // console.log("a.y1", a.y1, "a.y2", a.y2, "b.y1", b.y1, "b.y2", b.y2);
        let dx = b.xm - a.xm;
        let dy = b.ym - a.ym;

        biggerWidth = a.width > b.w ? a.w : b.w;
        biggerHeight = a.h > b.h ? a.h : b.h;

        console.log("dx:", dx, "dy:", dy, "bW:", biggerWidth, "bH:", biggerHeight);

        let tol = 0.9;
        xDistance = (a.w+b.w)/2;
        yDistance = (a.h+b.h)/2;
        console.log("xD:", xDistance, "yD:", yDistance)
        let ndx = 0;
        let ndy = 0;
        if (dx >= tol*xDistance) {
            ndx = 1;
        } else if (dx <= -tol*xDistance) {
            ndx = -1;
        }
        if (dy >= tol*yDistance) {
            ndy = 1;
        } else if (dy <= -tol*yDistance) {
            ndy = -1;
        }
        return {dx: ndx, dy: ndy};
    }
    return 0;
}



function keyPressed() {
    if (keyCode === 32) {
       if (paused) {
           loop();
           console.log("unpaused");
       } else {
           noLoop();
           console.log("paused");           
       }
       paused = !paused;
    }
}