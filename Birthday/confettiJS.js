canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var snowflakeMaxSize = 50.0;
var maxVelocity = 9.8;

//creates snowflake class
class Snowflake {
  constructor(size, xPos, velocity, angle, rotationSpeed, fade) {
    this.size = size;
    this.xPos = xPos;
    this.velocity = velocity;
    this.scaleFactor = angle;
    this.fade = fade;
    this.height = 0;
    this.rotationSpeed = rotationSpeed;
  }
  drawImage() {
    let scaleFactor = Math.cos(Math.PI * counter/180);
    ctx.save();
    if (scaleFactor >=0) {
      ctx.translate(canvas.width/ 2 - Math.abs(scaleFactor) * 100, counter);
    } else {
      ctx.translate(canvas.width/ 2 + Math.abs(scaleFactor) * 100, counter);
    }
    ctx.scale(scaleFactor,1);
    counter = counter + 2;
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, 2 * Math.PI);
    ctx.restore();
    ctx.fillStyle = '#8ED6FF';
    ctx.fill();
  }
}

//where snowflakes are stored
var snowflakeStack = [];

//generate initial snowflakes
function generateTo100(snowflakeStack) {
  while (snowflakeStack.length != 800) {
    snowflakeStack.push(generateSnow());
  }
}
//randomized attributes generator
function generateSnow() {
  var randSize = Math.random() * snowflakeMaxSize;
  var randPos = Math.random() * canvas.width;
  var velocity = 1 + Math.random() * (maxVelocity - 1); //min velocty of 1
  var angle = 2* Math.PI * Math.random();
  var fade = 0.9 + 0.1 * Math.random();
  var rotationSpeed = Math.random();
  var tempSnowflake = new Snowflake(randSize, randPos, velocity, angle, rotationSpeed, fade);
  return tempSnowflake;
}
//sets canvas to desired width/height
canvas.width = 800;
canvas.height = 600;

//creates 800 randomized snowflakes
//generateTo100(snowflakeStack);

setInterval(time, 10);
var counter = 0;
function time() {
  let scaleFactor = Math.cos(Math.PI * counter/180);
  ctx.clearRect(0,0, canvas.width , canvas.height);
  ctx.save();
  if (scaleFactor >=0) {
    ctx.translate(canvas.width/ 2 - Math.abs(scaleFactor) * 100, counter);
  } else {
    ctx.translate(canvas.width/ 2 + Math.abs(scaleFactor) * 100, counter);
  }

  ctx.scale(scaleFactor,1);
  counter = counter + 2;
  ctx.beginPath();
  ctx.arc(100, 100, 100, 0, 2 * Math.PI);
  ctx.restore();
  ctx.fillStyle = '#8ED6FF';
  ctx.fill();
}








//creates a timestep
//setInterval(timeStep, 100);

/* Experimentation with wind
var counter = 0;
var amortized = 2;
var wind = 0;
var sign = 1
*/

//each timeStep

function timeStep() {
  /*
  counter += 1;
  if (counter % amortized == 0) {
    amortized  = amortized * 2;
    sign = -sign;
  }
  wind += sign * 3 * Math.random();
  */
  ctx.clearRect(0,0, canvas.width, canvas.height);

  var newSnowflakeStack = [];
  for (flake of snowflakeStack) {
    if (flake.alpha < 0.01 || flake.height > canvas.height) {
        continue;
    }
    //rotation
    ctx.save();
    flake.height += flake.velocity;
    ctx.translate(flake.xPos, flake.height);
    flake.angle += flake.rotationSpeed * (Math.PI / 24);
    ctx.rotate(flake.angle);
    flake.alpha  = flake.alpha * flake.fade;
    ctx.globalAlpha = flake.alpha;
    ctx.drawImage(flake.image, -flake.size/2, -flake.size/2, flake.size, flake.size);
    ctx.translate(-flake.xPos, -flake.height);
    ctx.restore();
    newSnowflakeStack.push(flake);
  }
  snowflakeStack = newSnowflakeStack;
  //creates more snow if needed (runs off screen or disappears)
  if (snowflakeStack.length != 800) {
    generateTo100(snowflakeStack);
  }
}
