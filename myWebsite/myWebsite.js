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
	ctx.drawImage(mapImage, 50, 50, 50, 50);
	ctx.font = "30px Courier";
	ctx.fillStyle = "#000000";
	ctx.fillText("Bear Maps", mapCanvas.width *2/ 5, mapCanvas.height / 2);
}

mapCanvas.onmouseover = function onMouseover(e) {
	ctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	ctx.drawImage(mapImage, 40, 40, 75, 75);
	ctx.font = "30px Courier";
	ctx.fillStyle = "#F19CBB";
	ctx.fillText("Bear Maps", mapCanvas.width *2/ 5, mapCanvas.height / 2);
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
	Sctx.drawImage(seasonImage, 50, 50, 50, 50);
	Sctx.font = "15px Courier";
	Sctx.fillStyle = "#000000";
	Sctx.fillText("Seasons Background", seasonCanvas.width * 2/ 5, seasonCanvas.height / 2);
}

seasonCanvas.onmouseover = function onMouseover(e) {
	Sctx.clearRect(0,0, mapCanvas.width, mapCanvas.height);
	Sctx.drawImage(seasonImage, 40, 40, 75, 75);
	Sctx.font = "15px Courier";
	Sctx.fillStyle = "#F19CBB";
	Sctx.fillText("Seasons Background", seasonCanvas.width * 2/ 5, seasonCanvas.height / 2);
}
seasonCanvas.addEventListener("mouseout",function() {
	resetSeason()
});
