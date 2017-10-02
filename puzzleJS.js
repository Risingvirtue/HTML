var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var audio1 = new Audio("https://www.soundjay.com/button/beep-05.wav");
var audio2 = new Audio("https://www.soundjay.com/button/button-37.wav");
var correctPieces = 0;
var image = new Image();
image.onload = start;
image.src = "https://www.dailydot.com/wp-content/uploads/404/8a/efff4a1173921308b0a7f072412382b0.jpg";
ctx.canvas.width = image.width;
ctx.canvas.height = image.height;

var pieces = [];
var shiftedPieces = [];
for (y = 0; y < 10; y++) {
	for (x = 0; x < 20; x++) {
			pieces.push({col:y, row:x});
			shiftedPieces.push({col:y, row:x});
	}
}
canvas.pieces = pieces;
canvas.image = image;
function start() {
	shuffle(pieces)

	var width = image.width;
	var height = image.height;
	var cols = 10.0;
	var rows = 20.0;
	var pieceWidth = width / rows;
	var pieceHeight = height / cols;

	for (y = 0; y < 10; y++) {
		for (x = 0; x < 20; x++) {
				var currX = x * pieceWidth;
				var currY = y * pieceHeight;
				var currPiece = pieces[PairToIndex(y , x)]
				correctPieces += rightPlace(currPiece, PairToIndex(y , x));
				ctx.drawImage(image, currX, currY, pieceWidth, pieceHeight,
				currPiece.row * pieceWidth,
				currPiece.col * pieceHeight,
				 pieceWidth, pieceHeight);
		}
	}
}
//current Correct
$("#numCorrect").append(correctPieces);


//timer
var sec = 0;
setInterval(setTime, 1000);
function pad(number) {
	if (number < 10) {
		return "0" + number
	}
	return number
}
 function setTime() {
	sec++
	$("#seconds").html(pad(sec % 60));
	$("#minutes").html(pad(parseInt(sec / 60.0, 10)));
}




//swapping images
canvas.clicked = false;
var currPos = 'test';
var prevPos = 'tester';
var currXY = 'a';
var prevXY = 'b';
canvas.addEventListener('click', function(e) {
	pieceWidth = canvas.width / 20;
	pieceHeight = canvas.height / 10;
	x = Math.floor(e.layerX / pieceWidth);
	y = Math.floor(e.layerY / pieceHeight);
	prevPos = currPos;
	currPos = PairToIndex(y,x);
	prevXY = currXY;
	currXY = [x,y];

	if (!canvas.clicked) {
		canvas.clicked = !canvas.clicked;
		canvas.selected = pieces[currPos];
		var dx = canvas.selected.row * pieceWidth;
		var dy = canvas.selected.col * pieceHeight;
		/*
		ctx.clearRect(canvas.selected.row * pieceWidth,
									canvas.selected.col * pieceHeight,
									pieceWidth, pieceHeight)
									*/
		ctx.strokeStyle = '#FD0';
		ctx.strokeRect(x * pieceWidth + 1, y * pieceHeight + 1, pieceWidth - 2 , pieceHeight - 2);
	} else {
		canvas.clicked = !canvas.clicked;
		if (canvas.selected == pieces[currPos]) {
				var dx = canvas.selected.row * pieceWidth;
				var dy = canvas.selected.col * pieceHeight;
				ctx.drawImage(image, dx, dy, pieceWidth, pieceHeight,
											x*pieceWidth,
											y*pieceHeight,
											 pieceWidth, pieceHeight);
		} else {
			secondPiece = pieces[currPos];
			firstPiece = canvas.selected;
			var dx = firstPiece.row * pieceWidth;
			var dy = firstPiece.col * pieceHeight;
			var dx2 = secondPiece.row * pieceWidth;
			var dy2 = secondPiece.col * pieceHeight;

			ctx.clearRect(prevXY[0] * pieceWidth,
										prevXY[1] * pieceHeight,
										pieceWidth, pieceHeight);
			ctx.clearRect(x * pieceWidth,
										y * pieceHeight,
										pieceWidth, pieceHeight);
			ctx.drawImage(image, dx2, dy2, pieceWidth, pieceHeight,
										prevXY[0] * pieceWidth, prevXY[1] * pieceHeight, pieceWidth, pieceHeight);
			ctx.drawImage(image, dx, dy, pieceWidth, pieceHeight,
										x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight);
			var numCorrect = rightPlace(firstPiece, prevPos) + rightPlace(secondPiece, currPos);
			pieces[currPos] = firstPiece;
			pieces[prevPos] = secondPiece;
			var afterCorrect = rightPlace(firstPiece, currPos) + rightPlace(secondPiece, prevPos);
			if (afterCorrect - numCorrect > 0) {
				audio2.play();
			} else {
				audio1.play();
			}
			correctPieces += numCorrect - afterCorrect;
			$("#numCorrect").update("Number Correct: " + correctPieces)
			$("#numCorrect").animate({'color': '#FF0000'}, 2000);
			$("#numCorrect").animate({'color': '#000000'}, 2000);
		}
	}
})


//helper functions
function rightPlace(piece, position) {
	coordinate = IndexToPair(position);
	return piece.col == coordinate[1] && piece.row == coordinate[0]

}

function PairToIndex(y , x) {
	return x + y * 20
}

function IndexToPair(position) {
	return [position % 20, Math.floor(position / 20)]
}
//original shuffle found in stack overflow
function shuffle(a){
  for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
  return a;
};
