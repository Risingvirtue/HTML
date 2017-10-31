canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
/*
var imageLink = prompt("Please give an image link", "https://image.freepik.com/free-icon/facebook-logo-with-rounded-corners_318-9850.jpg")

while (!(imageLink != null || imageLink.substring(imageLink.length - 4) == ".jpg" ||
	imageLink.substring(imageLink.length - 4) == ".png")) {
	alert("Please include a valid link");
	var imageLink = prompt("Please give an image link", "https://image.freepik.com/free-icon/facebook-logo-with-rounded-corners_318-9850.jpg")
}
*/
var currImage = new Image();
currImage.src = "realNet.png";

canvas.width = 100;
canvas.height = 100;


ctx.drawImage(currImage, 0, 0, 100, 100);


var imgd = ctx.getImageData(0, 0, 100, 100);
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





ctx.putImageData(imgd, 0, 0);

