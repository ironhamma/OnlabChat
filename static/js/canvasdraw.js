var canvas = document.getElementById("chatCanvas");
var ctx = canvas.getContext("2d");
var posX = 0;
var posY = 0;
var firstClick = undefined;
var rect = canvas.getBoundingClientRect();

var clickedXOne = posX;
var clickedYOne = posY;
var clickedXTwo = posX;
var clickedYTwo = posY;
var prevX;
var prevY;
var contDraw = false;
var canvasCleared = true;

var mode = "";

var socket = io.connect('http://localhost:5000');

function sendMouseData(x,y){
 var data = {
     x: x,
     y: y,
 }
 socket.emit('canvasMouse',JSON.stringify(data));
}

$("#cAContinous").click(function(){
    mode = "continous";
    console.log("Continous");
});

$("#cAClear").click(function(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    socket.emit('canvasCleared',canvasCleared);
});

socket.on('canvasCleared',function(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
})

function drawCont(x, y){
    ctx.beginPath();
    ctx.moveTo(prevX,prevY);
    ctx.lineTo(x,y);
    ctx.closePath();
    ctx.stroke();

    prevX = x;
    prevY = y;
}

function onDrawingEvent(data){
    //prevX = data.x;
    //prevY = data.y;
    drawCont(data.x, data.y);
}

socket.on('canvasMouse', function(data){
    var res = JSON.parse(data);
    onDrawingEvent(res);
})

$("#chatCanvas").mousemove(function(event){
    posX = event.clientX - rect.left;
    posY = event.clientY - rect.top;

    if(contDraw){
        drawCont(posX, posY);
        sendMouseData(posX,posY);
    }

});

$("#chatCanvas").click(function(){
    switch(mode){
        case "continous":
            if(firstClick == undefined){
                firstClick = true;
            }
            if(firstClick){
                contDraw = true;
                firstClick = false;
            }
            else{
                contDraw = false;
                firstClick = true;
                prevX = undefined;
                prevY = undefined;
            }
            break;
    }
});
