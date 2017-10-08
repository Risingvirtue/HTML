
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var background = new Image();
background.src = "http://i.imgur.com/MfZhDT4.png";
var snowflakeMaxSize = 50.0;
var maxVelocity = 9.8;

//need velocity, wind, fade
class Snowflake {
  constructor(size, xPos, velocity, angle, rotationSpeed, fade) {
    this.size = size;
    this.xPos = xPos;
    this.velocity = velocity;
    this.angle = angle;
    this.fade = fade;
    this.height = 0;
    this.rotationSpeed = rotationSpeed;
    this.constructImage();

  }
  constructImage() {
    var snow = new Image();
    snow.src = "snowflakeTemplate.png";
    this.alpha = 1.0;
    this.image = snow;
  }
}

var snowflakeStack = [];
//generate initial snowflakes
function generateTo100(snowflakeStack) {
  while (snowflakeStack.length != 100) {
    snowflakeStack.push(generateSnow());
  }
}


function generateSnow() {
  var randSize = Math.random() * snowflakeMaxSize;
  var randPos = Math.random() * canvas.width;
  var velocity = 1 + Math.random() * (maxVelocity - 1 ); //min velocty of 1
  var angle = Math.PI * Math.random();
  var fade = 0.8 + 0.2 * Math.random();
  var rotationSpeed = Math.random();
  var tempSnowflake = new Snowflake(randSize, randPos, velocity, angle, rotationSpeed, fade);
  return tempSnowflake;
}

generateTo100(snowflakeStack);
setInterval(timeStep, 100);
function timeStep() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(0,0, canvas.width, canvas.height);
  var newSnowflakeStack = [];
  for (flake of snowflakeStack) {
    if (flake.alpha < 0.01 || flake.height > canvas.height) {
        continue;
    }
    ctx.save();
    flake.height += flake.velocity;
    ctx.translate(flake.xPos, flake.height);
    flake.angle += flake.rotationSpeed * (Math.PI / 48);
    ctx.rotate(flake.angle);
    flake.alpha  = flake.alpha * flake.fade;
    ctx.globalAlpha = flake.alpha;
    ctx.drawImage(flake.image, -flake.size/2, -flake.size/2, flake.size, flake.size);
    ctx.translate(-flake.xPos, -flake.height);
    ctx.restore();
    newSnowflakeStack.push(flake);
  }
  snowflakeStack = newSnowflakeStack;
  if (snowflakeStack.length != 100) {
    generateTo100(snowflakeStack);
  }
}

/*

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

var snow = new Image();
snow.src = "snowflakeImage.png";
ctx.drawImage(snow, 0, 0, 250, 250);

var imgd = ctx.getImageData(0, 0, 250, 250);
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
ctx.putImageData(imgd, 0,0);
*/
