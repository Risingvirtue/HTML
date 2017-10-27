$(document).ready(function() {
	resetMap();
	resetSeason();
	$(window).scroll(function () {
    //console.log($(window).scrollTop())
    if ($(window).scrollTop() > 280) {
      $('#navBar').addClass('navFixed');
    }
    if ($(window).scrollTop() < 281) {
      $('#navBar').removeClass('navFixed');
		}
		});
	});



mapCanvas = document.getElementById("bearMaps");

ctx = mapCanvas.getContext("2d");
var mapImage = new Image();
mapImage.src = "map.png";

function resetMap() {
	ctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	ctx.drawImage(mapImage, 25, 50, 50, 50);
	ctx.font = "30px Courier";
	ctx.fillStyle = "#000000";
	ctx.fillText("Bear Maps", 100, 75);
}

mapCanvas.onmouseover = function onMouseover(e) {
	ctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	ctx.drawImage(mapImage, 12.5, 37.5, 75, 75);
	ctx.font = "30px Courier";
	ctx.fillStyle = "#F19CBB";
	ctx.fillText("Bear Maps", 100, 75);
}
mapCanvas.addEventListener("mouseout",function() {
	resetMap()
});




seasonCanvas = document.getElementById("seasons");
Sctx = seasonCanvas.getContext("2d");
var seasonImage = new Image();
seasonImage.src = "leafTransparent.png";

function resetSeason() {
	Sctx.clearRect(0,0, seasonCanvas.width, seasonCanvas.height);
	Sctx.drawImage(seasonImage, 25, 50, 50, 50);
	Sctx.font = "15px Courier";
	Sctx.fillStyle = "#000000";
	Sctx.fillText("Seasons Background", 100, 75);
}

seasonCanvas.onmouseover = function onMouseover(e) {
	Sctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	Sctx.drawImage(seasonImage, 12.5, 37.5, 75, 75);
	Sctx.font = "15px Courier";
	Sctx.fillStyle = "#F19CBB";
	Sctx.fillText("Seasons Background", 100, 75);
}
seasonCanvas.addEventListener("mouseout",function() {
	resetSeason();
});

mailImage = document.getElementById("mail");
gitImage = document.getElementById("github");
facebookImage = document.getElementById("facebook");
mailImage.addEventListener("mouseover", function() {
	gitImage.
}









