
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

var playerOneLife = 3;
var playerTwoLife = 3;

var playerOneScore = 0;
var playerTwoScore = 0;


var ballX = col * blockSize;
var ballY = row * blockSize;
var ballRadius = Math.PI * 6;

var ballXSpeed = Math.floor(Math.random() * 76 + 25) / 10;
var ballYSpeed = Math.floor(Math.random() * 76 + 25) / 10;

var playerOneLifeDom = document.getElementById("playerOneLife");
var playerTwoLifeDom = document.getElementById("playerTwoLife");

var playerOneScoreDom = document.getElementById("scorePlayOne");
var playerTwoScoreDom = document.getElementById("scorePlayTwo");

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
    document.getElementById("gameOver").classList.remove("active");
    
    placeBall()
    window.addEventListener("keyup", playerEvent);
    let playBtn = document.getElementById("playGame");
    playBtn.addEventListener("click", startGame);
    setInterval(update, 1000/10);
}

function update() {    
    context.fillStyle = "#424769";
    context.fillRect(0, 0, borad.width, borad.height);

    // player's life update
    playerOneLifeDom.innerText = `Life: ${playerOneLife}`;
    playerTwoLifeDom.innerText = `Life: ${playerTwoLife}`;

    // player's score update
    playerOneScoreDom.innerText = `Score: ${playerOneScore}`;
    playerTwoScoreDom.innerText = `Score: ${playerTwoScore}`;

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
            playerOneScore += 1;
        }
    
    // Player two collision
    if (ballX < playerTwoHandlerX + playerHandlerWidth + 20 && 
        ballX + ballRadius > playerTwoHandlerX && 
        ballY < playerTwoHandlerY + playerHandlerHeight &&
        ballY + ballRadius > playerTwoHandlerY) {
            ballXSpeed = -ballXSpeed;
            playerTwoScore += 1;
        }

    
    // Player's life
    if (ballX < 0 && playerOneLife > 0) {
        playerOneLife -= 1;
        placeBall();
    }

    if (ballX > borad.width && playerTwoLife > 0) {
        playerTwoLife -= 1;
        placeBall();
    }

    // Game Over
    if (playerTwoLife <= 0 || playerOneLife <= 0) {
        document.getElementById("playerOneScore").innerText = `Player One Score: ${playerOneScore}`
        document.getElementById("playerTwoScore").innerText = `Player Two Score: ${playerTwoScore}`
        

        if (playerOneScore > playerTwoScore) {
            if (playerOneLife > playerTwoLife) {
                document.getElementById("winer").innerText = "The Winer Is Player One";
            } else {
                document.getElementById("winer").innerText = "The Winer Is Player Two";
            }
        } else {
            if (playerOneLife > playerTwoLife) {
                document.getElementById("winer").innerText = "The Winer Is Player One";
            } else {
                document.getElementById("winer").innerText = "The Winer Is Player Two";
            }
            
        }
        document.getElementById("gameOver").classList.add("active");
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


function startGame() {
    document.getElementById("gameOver").classList.remove("active");
    
    playerOneLife = 3;
    playerTwoLife = 3;

    playerTwoHandlerY = (row * blockSize)/2 - playerHandlerHeight;
    playerOneHandlerY = (row * blockSize)/2 - playerHandlerHeight;
    placeBall()
    update();
}