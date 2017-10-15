canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var snowflakeMaxSize = 10.0;
var maxVelocity = 19.8;
var cake = new Image();
cake.src  ="cake.png";
//creates snowflake class
class Snowflake {
  constructor(color, size, xPos, velocity, angle, rotationSpeed, fade) {
    this.color = color;
    this.size = size;
    this.xPos = xPos;
    this.velocity = velocity;
    this.angle = angle;
    this.fade = fade;
    this.height = 0;
    this.rotationSpeed = rotationSpeed;
  }
}

var confettiStack = [];
generateTo100(confettiStack);
setInterval(time, 100);

//generate initial snowflakes
function generateTo100(snowflakeStack) {
  while (snowflakeStack.length != 100) {
    snowflakeStack.push(generateSnow());
  }
}
//randomized attributes generator
function generateSnow() {
  let randSize = snowflakeMaxSize * 0.5 + Math.random() * snowflakeMaxSize;
  let randPos = Math.random() * canvas.width;
  let velocity = 1 + Math.random() * (maxVelocity - 1); //min velocty of 1
  let angle = 2 * Math.PI * Math.random();
  let fade = 0.9 + 0.1 * Math.random();
  let rotationSpeed = 0.5 + 0.5 * Math.random();
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let color = "rgb(" + r + "," + g + "," + b + ")";
  let tempSnowflake = new Snowflake(color, randSize, randPos, velocity, angle, rotationSpeed, fade);
  return tempSnowflake;
}
//sets canvas to desired width/height
canvas.width = 800;
canvas.height = 600;

//creates 800 randomized snowflakes
generateTo100(confettiStack);

//setInterval(time, 10);

function time() {
  ctx.clearRect(0 ,0 ,canvas.width, canvas.height);
  ctx.drawImage(cake, 300, 300);
  for (con of confettiStack) {
	  if (con.height > canvas.height) {
		  con.height = 0;
	  }
    con.angle += con.rotationSpeed * Math.PI/24;
    con.height += con.velocity;
    let scaleFactor = Math.cos(con.angle + Math.PI / 180);
    ctx.save();
    if (scaleFactor >=0) {
      ctx.translate(con.xPos, con.height);
    } else {
      ctx.translate(con.xPos, con.height);
    }
    ctx.scale(scaleFactor,1);
    ctx.beginPath();
    ctx.arc(0,0, con.size, 0, 2 * Math.PI);
    ctx.restore();
    ctx.fillStyle = con.color;
    ctx.fill();
  }
}
