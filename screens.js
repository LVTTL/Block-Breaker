function gameOverScreen() {
    background(120, 120, 120);
    textSize(75);
    textAlign(CENTER);
    fill(255, 0, 0);
    text("Game Over!", width/2, height/2);
    noLoop();
}

function winningScreen() {
    background(120, 120, 120);
    textSize(75);
    textAlign(CENTER);
    fill(0, 255, 0);
    text("Congrats!", width/2, height/2);
    noLoop();
}


function errorScreen() {
    background(120, 120, 120);
    textSize(75);
    textAlign(CENTER);
    fill(255, 0, 0);
    text("Error", width/2, height/2);
    noLoop();
}

function pauseScreen() {
    push();
    textSize(75);
    textAlign(CENTER);
    fill(0, 255, 0);
    text("Paused", width/2, height/2);
    pop();
}