
var blockSize = 25;
var row = 20;
var col = 34;

var context;
var borad;

var playerHandlerWidth = 10;
var playerHandlerHeight = row * 6;

var playerOneHandlerX = 10;
var playerOneHandlerY = (row * blockSize)/2 - playerHandlerHeight;


var playerTwoHandlerX = (col * blockSize) - 20;
var playerTwoHandlerY = (row * blockSize)/2 - playerHandlerHeight;

var ballX = col * blockSize;
var ballY = row * blockSize;
var ballRadius = Math.PI * 6;

var ballXSpeed = Math.floor(Math.random() * 76 + 25) / 10;
var ballYSpeed = Math.floor(Math.random() * 76 + 25) / 10;

if (Math.floor(Math.random() * 2) == 0) {
    ballXSpeed = -ballXSpeed;
}

if (Math.floor(Math.random() * 2) == 0) {
    ballYSpeed = -ballYSpeed
}


var ballMoveSpeed = 10;
var playerHandlerMoveSpeed = 15;

// load the game console
window.onload = function() {
    borad = document.getElementById('gameConsole');
    borad.height = row * blockSize;
    borad.width = col * blockSize;
    context = borad.getContext("2d");
    
    placeBall()
    window.addEventListener("keyup", playerEvent);
    setInterval(update, 1000/10);
}

function update() {
    context.fillStyle = "#424769";
    context.fillRect(0, 0, borad.width, borad.height);


    // Player One Handler
    drawPlayHandler(playerOneHandlerX, playerOneHandlerY, playerHandlerWidth, playerHandlerHeight, "white")

    // Player Two Handler
    drawPlayHandler(playerTwoHandlerX, playerTwoHandlerY, playerHandlerWidth, playerHandlerHeight, "white")

    // Ball
    drawBall(ballX, ballY, ballRadius, "red");

    ballX += ballXSpeed;
    ballY += ballYSpeed;

    // Bull boundary
    if (ballY - ballRadius - 20 / 2 < 0 && ballYSpeed < 0) {
        ballYSpeed = -ballYSpeed;
    }

    if (ballY + ballRadius + 20 / 2 > borad.height && ballYSpeed > 0) {
        ballYSpeed = -ballYSpeed;
    }

    // Player one collision
    if (ballX < playerOneHandlerX + playerHandlerWidth + 20 && 
        ballX + ballRadius > playerOneHandlerX && 
        ballY < playerOneHandlerY + playerHandlerHeight &&
        ballY + ballRadius > playerOneHandlerY) {
            ballXSpeed = -ballXSpeed;
        }
    
    // Player two collision
    if (ballX < playerTwoHandlerX + playerHandlerWidth + 20 && 
        ballX + ballRadius > playerTwoHandlerX && 
        ballY < playerTwoHandlerY + playerHandlerHeight &&
        ballY + ballRadius > playerTwoHandlerY) {
            ballXSpeed = -ballXSpeed;
        }

}

function playerEvent(e){
    if (e.code == "KeyW" &&  playerOneHandlerY > 20) {
        playerOneHandlerY -= playerHandlerMoveSpeed;
    } else if (e.code == "KeyS" && playerOneHandlerY < (row * blockSize) - 120) {
        playerOneHandlerY += playerHandlerMoveSpeed;
    }

    if (e.code == "ArrowUp" && playerTwoHandlerY > 20) {
        playerTwoHandlerY -= playerHandlerMoveSpeed;
    } else if (e.code == "ArrowDown" && playerTwoHandlerY < (row * blockSize) - 120) {
        playerTwoHandlerY += playerHandlerMoveSpeed;
        console.log(borad.height);
    }
}

function drawPlayHandler(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawBall(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, radius);
    context.closePath();
    context.fill()
}

function placeBall() {
    ballX = (col * blockSize) / 2;
    ballY = (row * blockSize) / 2;
}
