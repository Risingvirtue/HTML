canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

var imageLink = new Image();
imageLink.src = "leaf1.png";

canvas.width = 1000;
canvas.height = 1000;
ctx.fillStyle = "cyan";
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.drawImage(imageLink, canvas.width / 2, canvas.height /2);

