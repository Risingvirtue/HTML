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
var greenPieces = {};
for (y = 0; y < 10; y++) {
	for (x = 0; x < 20; x++) {
			var dict = {col:y, row:x};
			pieces.push(dict);
			shiftedPieces.push(dict);
			greenPieces[[y,x]] = [false, false, false, false]
	}
}
canvas.pieces = pieces;
canvas.image = image;
function start() {
	//shuffle(pieces)

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


var currCorrect = new Set();

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
			newCorrect(firstPiece, currPos);
			newCorrect(secondPiece, prevPos);


			//$("#numCorrect").update("Number Correct: " + correctPieces)
			//$("#numCorrect").animate({'color': '#FF0000'}, 2000);
			//$("#numCorrect").animate({'color': '#000000'}, 2000);
		}
	}
})


//helper functions
function rightPlace(piece, position) {
	coordinate = IndexToPair(position);
	return piece.col == coordinate[1] && piece.row == coordinate[0]
}

function newCorrect(piece, position) {
	if (currCorrect.has(piece)) {
		currCorrect.remove(piece);
		colorNeighborGreen(piece);
	}

	if (!currCorrect.has(piece) && rightPlace(piece, position)) {
		currCorrect.add(piece);
		colorGreen(piece);
	}
}
//spreads green to other pieces after removing from correct
function colorNeighborGreen(piece) {
	return
}


//colors itself green
function colorGreen(piece) {
	var a = piece.col;
	var b = piece.row;
	var neighbors = colorGreenHelper(piece)[0];
	var nonNeighbors = colorGreenHelper(piece)[1];

	for (n of neighbors) {
		//negative means up, left
		var location = [n.col - a, n.row - b];
		if (currCorrect.has(n)) {
				removeLine(n, location);
		} else {
			colorItself(piece, location);
		}
	}

	for (n1 of nonNeighbors) {
		var location = [n1.col - a, n1.row - b];
		var direction = index[0] + index[1] + Math.abs(index[0]) + ;
		colorItself(piece, location);
	}

}

function colorItself(piece, index) {
	var a = piece.col;
	var b = piece.row;
	var direction = index[0] + index[1] + Math.abs(index[0]);
	if (direction == -2) {
		ctx.beginPath();
		ctx.moveTo(b * pieceWidth + 1, a * pieceHeight + 1);
		ctx.lineTo(b * pieceWidth + 1, a * pieceHeight + pieceHeight - 1);
		ctx.strokeStyle = "green";
		ctx.stroke();
	} else if (direction == -1) {
		ctx.beginPath();
		ctx.moveTo(b * pieceWidth + 1, a * pieceHeight + 1);
		ctx.lineTo(b * pieceWidth + pieceWidth - 1, a * pieceHeight + 1);
		ctx.strokeStyle = "green";
		ctx.stroke();
	} else if (direction == 1) {
		ctx.beginPath();
		ctx.moveTo(b * pieceWidth + pieceWidth - 1, a * pieceHeight + 1);
		ctx.lineTo(b * pieceWidth + pieceWidth - 1, a * pieceHeight + pieceHeight - 1);
		ctx.strokeStyle = "green";
		ctx.stroke();
	} else {
			ctx.beginPath();
			ctx.moveTo(b * pieceWidth + 1, a * pieceHeight + pieceHeight - 1);
			ctx.lineTo(b * pieceWidth + pieceWidth - 1,  a * pieceHeight + pieceHeight - 1);
			ctx.strokeStyle = "green";
			ctx.stroke();
	}
}
function colorGreenHelper(piece) {
	var a = piece.col;
	var b = piece.row;
	var potentialNeighbors = [[a + 1, b], [a - 1, b], [a, b + 1], [a, b - 1]];
	var neighbors = [];
	var nonNeighbors = [];
	for (num in  potentialNeighbors) {
		n = potentialNeighbors[num]
		var tempPiece = {col:n[0], row:n[1]};
		if (n[0] >= 0 && n[0] <= 9 && n[1] >= 0 && n[1] <= 19) {
			neighbors.push(tempPiece);
		} else {
			nonNeighbors.push(tempPiece);
		}
	}
	return [neighbors, nonNeighbors]
}


function removeLine(neighborPiece, index) {
	//left = -2 , up = -1, right = 1, down = 2
	var direction = index[0] + index[1] + Math.abs(index[0]);
	if (direction == -2) {
		var dx = neighborPiece.row * pieceWidth + pieceWidth - 1;
		var dy = neighborPiece.col * pieceHeight;
		ctx.clearRect(image, dx, dy, 1, pieceHeight);
		var shiftedPiece = pieces[PairToIndex(index[0], index[1])];
		var shiftedDx = shiftedPiece.row * pieceWidth + pieceWidth - 1;
		var shiftedDy = shiftedPiece.col * pieceHeight;
		ctx.drawImage(image, shiftedDx, shiftedDy, 1, pieceHeight, dx, dy, 1, pieceHeight);
	} else if (direction == -1) {
		var dx = neighborPiece.row * pieceWidth;
		var dy = neighborPiece.col * pieceHeight + pieceHeight - 1;
		ctx.clearRect(image, dx, dy, pieceWidth, 1);
		var shiftedPiece = pieces[PairToIndex(index[0], index[1])];
		var shiftedDx = shiftedPiece.row * pieceWidth;
		var shiftedDy = shiftedPiece.col * pieceHeight + pieceHeight - 1;
		ctx.drawImage(image, shiftedDx, shiftedDy, pieceWidth, 1, dx, dy, pieceWidth, 1);
	} else if (direction == 1) {
		var dx = neighborPiece.row * pieceWidth;
		var dy = neighborPiece.col * pieceHeight;
		ctx.clearRect(image, dx, dy, 1, pieceHeight);
		var shiftedPiece = pieces[PairToIndex(index[0], index[1])];
		var shiftedDx = shiftedPiece.row * pieceWidth;
		var shiftedDy = shiftedPiece.col * pieceHeight;
		ctx.drawImage(image, shiftedDx, shiftedDy, 1, pieceHeight, dx, dy, 1, pieceHeight);
	} else {
		var dx = neighborPiece.row * pieceWidth;
		var dy = neighborPiece.col * pieceHeight;
		ctx.clearRect(image, dx, dy, 1, pieceHeight);
		var shiftedPiece = pieces[PairToIndex(index[0], index[1])];
		var shiftedDx = shiftedPiece.row * pieceWidth;
		var shiftedDy = shiftedPiece.col * pieceHeight;
		ctx.drawImage(image, shiftedDx, shiftedDy, pieceWidth, 1, dx, dy, pieceWidth, 1);
	}

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
