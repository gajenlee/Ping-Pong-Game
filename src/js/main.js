
var blockSize = 25;
var row = 25;
var col = 34;

var context;
var borad;




window.onload = function() {
    borad = document.getElementById('gameConsole');
    borad.height = row * blockSize;
    borad.width = col * blockSize;
    context = borad.getContext("2d");
    

    window.addEventListener("keypress", playerEvent);
    setInterval(update, 1000/10);
}

function update() {
    context.fillStyle = "#424769";
    context.fillRect(0, 0, borad.width, borad.height);
}

function playerEvent(){
    
}