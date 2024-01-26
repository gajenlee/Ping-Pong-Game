
var blockSize = 25;
var row = 25;
var col = 34;

var context;
var borad;

var playerHandlerWidth = 10;
var playerHandlerHeight = row * 6;

var playerOneHandlerX = 10;
var playerOneHandlerY = (row * blockSize)/2 - playerHandlerHeight;


var playerTwoHandlerX = (col * blockSize) - 20;
var playerTwoHandlerY = (row * blockSize)/2 - playerHandlerHeight;

var ballX = (col * blockSize) / 2;
var ballY = (row * blockSize) / 2;
var ballRadius = Math.PI * 8;


var ballMoveSpeed = 5;
var playerHandlerMoveSpeed = 15;


window.onload = function() {
    borad = document.getElementById('gameConsole');
    borad.height = row * blockSize;
    borad.width = col * blockSize;
    context = borad.getContext("2d");
    

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

}

function playerEvent(e){
    if (e.code == "KeyW") {
        playerOneHandlerY -= playerHandlerMoveSpeed;
    } else if (e.code == "KeyS") {
        playerOneHandlerY += playerHandlerMoveSpeed;
    }

    if (e.code == "ArrowUp") {
        playerTwoHandlerY -= playerHandlerMoveSpeed;
    } else if (e.code == "ArrowDown") {
        playerTwoHandlerY += playerHandlerMoveSpeed;
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