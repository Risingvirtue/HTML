canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

var circle = new Path2D();

//position = [canvas.width / 2, canvas.height / 2];
var keys = [false, false, false, false];
var x = 0,
	y = 0,
	velY = 0,
	velX = 0,
	speed = 2,
	friction = 1;
var mousePos = {x:0, y:0};

//setInterval(step, 1000/30);
/*
function step() {
	
	movement();
	
}
function movement() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.save();
	ctx.moveTo(x, y);
	ctx.beginPath();
	ctx.arc(x, y , 25, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
}
*/

function update() {
	requestAnimationFrame(update);
	
	if (keys[0]) {
		if (velX > -speed) {
			velX--;
		}
	} else if (keys[2]) {
		if (velX < speed) {
			velX++;
		}
	} else {
		velX = 0;
	}
	
	if (keys[1]) {
		if (velY > -speed) {
			velY--;
		}
	} else if (keys[3]) {
		if (velY < speed) {
			velY++;
		}
	} else {
		velY = 0;
	}
	
	
	velY *= friction;
    y = (y + velY) % canvas.height;
    velX *= friction;
    x += velX;
	if (x > (canvas.width) - 25) {
		x -= velX;
	} else if (x < 25){
		x = 25;
	}
	if (y > (canvas.height) - 25) {
		y -= velY;
	} else if (y < 25){
		y = 25;
	}
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
	ctx.moveTo(x, y);
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
	ctx.moveTo(x, y);
	let diffX = mousePos.x - x;
	let diffY = mousePos.y - y;
	ctx.lineTo(x + diffX / 10, y + diffY / 10);
	ctx.stroke();
	
}
update();
/*
document.onkeydown = checkKey;

function checkKey(e) {
	console.log(e.keyCode);
  switch(e.keyCode) {
	case 87:
		keys[1] = true;
		break;
	case 83:
		position[1] = (position[1] + 10) % canvas.height; 
		break;
	case 65: 
		position[0] = (position[0] - 10) % canvas.height; 
		break;
	case 68: 
		position[0] = (position[0] + 10) % canvas.height; 
		break;
  }
  movement();
}
*/

document.body.addEventListener("keydown", function (e) {
    switch(e.keyCode) {
	case 87:
		keys[1] = true;
		break;
	case 83:
		keys[3] = true;
		break;
	case 65: 
		keys[0] = true;
		break;
	case 68: 
		keys[2] = true;
		break;
  }
});
document.body.addEventListener("keyup", function (e) {
    switch(e.keyCode) {
	case 87:
		keys[1] = false;
		break;
	case 83:
		keys[3] = false;
		break;
	case 65: 
		keys[0] = false;
		break;
	case 68: 
		keys[2] = false;
		break;
  }
});


//track mouse movement from stackoverflow
canvas.addEventListener('mousemove', function(evt) {
	mousePos = getMousePos(canvas, evt);
}, false);

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {x: evt.clientX - rect.left,
			y:evt.clientY - rect.top};
}

