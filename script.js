// Make a jQuery selection to access the input DOM element.
var input = $('#experssion');
// Set the initial text value programmatically using jQuery.
input.val('sin(x)*x');

// Listen for changes using jQuery.
input.keyup(function (event) {
    
    var text = input.val();
    console.log(text);
    tree = math.parse(text,scope);
    console.log("Tree is :",tree);
    c.clearRect(0,0,canvas.width,canvas.height);
    drawingCoordinates();
    drawingCoordinateValues();
    drawing();
   
  });
////////////////////////////////
 // Here's how to evaluate math expressions using Math.js:
 var math = mathjs(),
 expr = 'sin(x)*x',
 scope = {
   x: 0
//    ,t:0
 },
 tree = math.parse(expr, scope);


console.log('Works');
var canvas = document.getElementById('myCanvas');
var c = canvas.getContext('2d');
// c.fillRect(0,0,20,50);
// c.moveTo(200,200);


var minX = -20,minY=-20,maxX=20,maxY=20,time=0,gridSize = 25;

function drawing(){
c.beginPath();
for(var i=0;i<1000;i++){
    
    var percentX=  i/999 ;
    var mathX = percentX * (maxX - minX) + minX;
    // console.log(mathX);
    // var mathY = Math.sin(mathX) * mathX;
    var mathY = gettingEquation(mathX);
    // 
    // console.log(mathX);
    var percentY = 1 - (mathY - minY) / ( maxY- minY);
    console.log("PerY : ",percentY);
    
    var x = percentX * canvas.width;
    var y = percentY * canvas.height;
    console.log("x = ",x," y = ",y);
    c.lineTo(x,y);
    
}
// c.fillRect(300,200,2,2);
c.strokeStyle = "#000000";
c.stroke();
}

// animateCanvas();

function gettingEquation(mathX){
    scope.x=mathX;
    
    // scope.t = time;
    // return Math.sin(mathX)* mathX;
    return tree.eval();

}
function animateCanvas(){
    setInterval(function(){
        time += 0.1;
        c.clearRect(0,0,canvas.width,canvas.height);

        drawing();
    },20)
}
// c.moveTo(0,300);
function drawingCoordinates(){
c.beginPath();
c.lineTo(canvas.width/2,0);
c.lineTo(canvas.width/2,canvas.height);
c.stroke();
c.beginPath();
c.lineTo(0,canvas.height/2);
c.lineTo(canvas.width,canvas.height/2);
c.stroke();
c.beginPath();
for(var i=0;i<canvas.width;i+=gridSize){
    if(i == canvas.width/2){
        continue;
    }
c.beginPath();
c.lineTo(i,0);
c.lineTo(i,canvas.height);
c.strokeStyle = "#e9e9e9";

c.stroke();
}
/////////////
for(var i=0;i<canvas.height;i+=gridSize){
    if(i == canvas.height/2){
        continue;
    }
c.beginPath();
c.lineTo(0,i);
c.lineTo(canvas.width,i);
c.strokeStyle = "#e9e9e9";
c.stroke();
}
}
function drawingCoordinateValues(){
    var counterY=canvas.height/gridSize;
    var counterX=-canvas.width/gridSize;
    c.beginPath();
    for(var i=0;i<canvas.height;i+=gridSize){
        if(counterY == 0){
            counterY-=2;
            continue;
        }
        c.font = "9px Arial";
        c.fillText(counterY,canvas.height/2-15,i+2);
        counterY-=2;

    }
    c.stroke();
    //////
    c.beginPath();
    for(var j=0;j<canvas.width;j+=gridSize){
        if(counterX == 0){
            counterX +=2;
            continue;
        }
        c.font = "9px Arial";
        c.fillText(counterX,j-3,canvas.width/2-2);
        counterX+=2;
    }
    c.stroke();
}
drawingCoordinates();
drawingCoordinateValues();
drawing();
