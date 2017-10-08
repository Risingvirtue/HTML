
/*
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var background = new Image();
background.src = "http://i.imgur.com/MfZhDT4.png";
var snowflakeMaxSize = 50.0;
var maxVelocity = 9.8;

//need velocity, wind, fade
var leaf = new Image();
leaf.src = "leafTransparent.png";
leaf.angle = 0;
leaf.tick = 0.0;
leaf.speed = Math.PI / 48;
leaf.gravity = gravity(leaf);

setInterval(timeStep, 100);
function timeStep() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';
  ctx.fillRect(0,0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  leaf.tick += 1/16;
  leaf.angle = 0.35 * Math.sin(2 * leaf.tick);

  ctx.rotate(leaf.angle);
  ctx.drawImage(leaf, 100, 100, 50, 50);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.restore();
}

*/


canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var leaf = new Image();
leaf.src = "uncropped.png";


ctx.drawImage(leaf, 0, 0 , 325, 250);

var imgd = ctx.getImageData(0, 0, 325, 250);
var pix = imgd.data;
var newColor = {r:0, g:0, b:0, a:0};

for (var i = 0, n = pix.length; i < n; i += 4) {
  var r = pix[i],
    g = pix[i+1],
    b = pix[i+2];

    if ( r >= 230 && g >= 230 && b >= 230) {
      pix[i] = newColor.r;
      pix[i+1] = newColor.g;
      pix[i+2] = newColor.b;
      pix[i+3] = newColor.a;
    }
}
ctx.putImageData(imgd, 0 , 0);
