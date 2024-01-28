
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

var ballX = 0;
var ballY = 0;
var ballRadius = Math.PI * 6;


var ballMoveSpeed = 10;
var playerHandlerMoveSpeed = 15;
var ballVel = 1;
var derArray = [-1, 1];
var index = Math.floor(Math.random() * derArray.length);
var der = derArray[index];

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