canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var background = new Image();
background.src = "https://avvesione.files.wordpress.com/2014/01/sasami_sanganbaranai-03-autumn-fall-golden_leaves-red-orange-water-peaceful.jpg";

var leafMaxSize = 150.0;
var maxVelocity = 9.8;
var maxDrift= 1.0/16.0;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");


class leafImage {
  constructor(size, xPos, velocity, angle, driftSpeed, fade) {
    this.size = size;
    this.xPos = xPos;
    this.velocity = velocity;
    this.angle = angle;
    this.fade = fade;
    this.height = 0;
    this.tick = angle;
    this.driftSpeed = driftSpeed;
    this.constructImage();
  }
  constructImage() {
    var leaf = new Image();
    leaf.src = "leafTransparent2.png";
    this.alpha = 1.0;
    this.image = leaf;
  }
}
var leafStack = [];

function generateTo100(leafStack) {
  while (leafStack.length != 100) {
    leafStack.push(generateLeaves());
  }
}



function generateLeaves() {
  var randSize = Math.random() * leafMaxSize;
  var randPos = Math.random() * canvas.width;
  var velocity = 1 + Math.random() * (maxVelocity - 1); //min velocty of 1
  var angle = (Math.PI / 3) * (Math.random() - 0.5);
  var fade = 0.99 + 0.01 * Math.random();
  var driftSpeed = 0.8 * maxDrift + maxDrift * Math.random() * 0.2;
  var tempLeaf = new leafImage(randSize, randPos, velocity, angle, driftSpeed, fade);
  return tempLeaf;
}

generateTo100(leafStack);


console.log(leafStack);
//need velocity, wind, fade
setInterval(timeStep, 100);
function timeStep() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.drawImage(background, 0 , 0 , canvas.width, canvas.height);
  var newLeafStack = [];
  for (leaf of leafStack) {
    if (leaf.alpha < 0.01 || leaf.height > canvas.height) {
        continue;
    }
    ctx.save();
    leaf.height += leaf.velocity;

    ctx.translate(leaf.xPos, leaf.height - 250); // generate above canvas
    leaf.tick += leaf.driftSpeed;
    leaf.angle = Math.PI / 3 * Math.sin(2 * leaf.tick);
    ctx.rotate(leaf.angle + Math.PI / 4);
    leaf.alpha  = leaf.alpha * leaf.fade;
    ctx.globalAlpha = leaf.alpha;
    ctx.drawImage(leaf.image, 100, 100, leaf.size, leaf.size);
    ctx.restore();
    newLeafStack.push(leaf);
  }
  leafStack = newLeafStack;
  if (leafStack.length != 100) {
    generateTo100(leafStack);
  }
}



/*
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
*/
