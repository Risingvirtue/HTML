var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var audio1 = new Audio("https://www.soundjay.com/button/beep-05.wav");
var audio2 = new Audio("https://www.soundjay.com/button/button-37.wav");
var correctPieces = 0;
var image = new Image();

var link = prompt("Please link a picture!", "https://www.dailydot.com/wp-content/uploads/404/8a/efff4a1173921308b0a7f072412382b0.jpg")
image.onload = start;
image.src = link;
ctx.canvas.width = image.width;
ctx.canvas.height = image.height;

var pieces = [];
var shiftedPieces = [];
var greenPieces = {};
var piecePosition = {};
for (y = 0; y < 10; y++) {
	for (x = 0; x < 20; x++) {
			var dict = {col:y, row:x};
			pieces.push(dict);
			shiftedPieces.push(dict);
			greenPieces[[y,x]] = [false, false, false, false];
			piecePosition[dict] = PairToIndex(y,x);
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
		ctx.strokeStyle = '#FD0';
		ctx.strokeRect(x * pieceWidth + 1, y * pieceHeight + 1, pieceWidth - 2 , pieceHeight - 2);
	} else {
		canvas.clicked = !canvas.clicked;
		if (canvas.selected == pieces[currPos]) {
			reColor(canvas.selected, currPos);
		} else {
			secondPiece = pieces[currPos];
			firstPiece = canvas.selected;
			var dx = firstPiece.row * pieceWidth;
			var dy = firstPiece.col * pieceHeight;
			var dx2 = secondPiece.row * pieceWidth;
			var dy2 = secondPiece.col * pieceHeight;
			reColor(firstPiece, currPos);
			reColor(secondPiece, prevPos);
			var numCorrect = rightPlace(firstPiece, prevPos) + rightPlace(secondPiece, currPos);
			pieces[currPos] = firstPiece;
			pieces[prevPos] = secondPiece;
			piecePosition[firstPiece] = currPos;
			piecePosition[secondPiece] = prevPos;
			var afterCorrect = rightPlace(firstPiece, currPos) + rightPlace(secondPiece, prevPos);
			if (afterCorrect - numCorrect > 0) {
				//audio2.play();
			} else {
				//audio1.play();
			}
			correctPieces += afterCorrect - numCorrect;
			newCorrect(firstPiece, currPos);
			newCorrect(secondPiece, prevPos);

			$("#numCorrect").html("Number Correct: " + correctPieces);
			//$("#numCorrect").animate({'color': '#FF0000'}, 2000);
			//$("#numCorrect").animate({'color': '#000000'}, 2000);
		}
	}
})


//helper functions
function rightPlace(piece, position) {
	var coordinate = IndexToPair(position);
	return piece.col == coordinate[1] && piece.row == coordinate[0]
}

function newCorrect(piece, position) {
	if (hasPiece(currCorrect, piece)) {
		//console.log('test1')
		removePiece(currCorrect, piece);
		var actualNeighbors = neighbors(piece);
		greenPieces[[piece.col, piece.row]]  = [false, false, false, false];
		for (n of actualNeighbors) {
			if (hasPiece(currCorrect, n)) {
				//console.log('pass1')
				var d = direction(n, piece);
				greenPieces[[n.col, n.row]][d] = true;
				reColor(n, PairToIndex(n.col, n.row));
			}
		}
		reColor(piece, position);
	}
	if (!hasPiece(currCorrect, piece) && rightPlace(piece, position)) {
		//console.log('test2', piece)
		currCorrect.add(piece);
		var actualNeighbors = neighbors(piece);
		greenPieces[[piece.col, piece.row]] = [true, true, true, true];
		//console.log('true array' , greenPieces[[piece.col, piece.row]])
		for (n of actualNeighbors) {
			//console.log('test2.1 has neighbors', n)
			if (hasPiece(currCorrect, n)) {
				var d = direction(n, piece);
				var currD = direction(piece, n);
				greenPieces[[n.col, n.row]][d] = false;
				greenPieces[[piece.col, piece.row]][currD] = false;
				console.log('neighbor', n, "greenPieces ",greenPieces[[n.col, n.row]])
				reColor(n, PairToIndex(n.col, n.row));
			}
		}
		//console.log('piece' , piece, 'array',	greenPieces[[piece.col, piece.row]])
		var coordinate = IndexToPair(position);
		//color without borders
		reColor(piece, position);
	}
}

function hasPiece(set, piece) {
	var row = piece.row;
	var col = piece.col;
	for (p of set) {
		//console.log('inside currCorrect', p)
		if (p.row == row && p.col == col) {
			return true
		}
	}
	return false
}

function removePiece(set, piece) {
	var row = piece.row;
	var col = piece.col;
	for (p of set) {
		if (p.row == row && p.col == col) {
			set.delete(p);
		}
	}
	return
}


function direction(piece, neighbor) {
	var x = neighbor.row - piece.row;
	var y = neighbor.col - piece.col;
	if (x == - 1) {
		return 0
	} else if (y == -1) {
		return 1
	} else if (x == 1) {
		return 2
	} else {
		return 3
	}
}

function neighbors(originalPiece) {

	var a = originalPiece.col;
	var b = originalPiece.row;
	var potentialNeighbors = [[a + 1, b], [a - 1, b], [a, b - 1], [a, b + 1]];
	var actualNeighbors = [];
	for (n of potentialNeighbors) {
		if (n[0] >=0 && n[0] <=9 && n[1] >= 0 && n[1] <= 19) {
			var tempPiece = {col:n[0], row:n[1]};
			actualNeighbors.push(tempPiece);
		}
	}
	return actualNeighbors
}
/*
//spreads green to other pieces after removing from correct
function colorNeighborGreen(piece) {
	return
}
*/
function reColor(piece, position) {
	var coordinate = IndexToPair(position);
	//color without borders
	ctx.clearRect(coordinate[0] * pieceWidth,coordinate[1] * pieceHeight, pieceWidth, pieceHeight);
	ctx.drawImage(image, piece.row * pieceWidth, piece.col * pieceHeight, pieceWidth, pieceHeight,
	coordinate[0] * pieceWidth,
	coordinate[1] * pieceHeight,
	pieceWidth, pieceHeight);
	//add greenborders
	colorGreen(piece, position);
}

function colorGreen(piece, position) {
	console.log('test 3 piece', piece, greenPieces[[piece.col, piece.row]])
	for (i = 0; i < 4; i++) {
		if (greenPieces[[piece.col, piece.row]][i]) {
			colorGreenHelper(piece, position, i);
		}
	}
}

function colorGreenHelper(piece, position, index) {
	//console.log('test 4 colored in:', i, 'on piece', piece)
	var a = IndexToPair(position)[1]
	var b = IndexToPair(position)[0]
	if (index == 0) {
		ctx.clearRect(b * pieceWidth, a * pieceHeight, 1, pieceHeight);
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(b * pieceWidth + 1, a * pieceHeight + 1);
		ctx.lineTo(b * pieceWidth + 1, a * pieceHeight + pieceHeight - 1);
		ctx.strokeStyle = "green";
		ctx.stroke();
	} else if (index == 1) {
		ctx.clearRect(b * pieceWidth, a * pieceHeight, pieceWidth, 1);
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(b * pieceWidth + 1, a * pieceHeight + 1);
		ctx.lineTo(b * pieceWidth + pieceWidth - 1, a * pieceHeight + 1);
		ctx.strokeStyle = "green";
		ctx.stroke();
	} else if (index == 2) {

		ctx.clearRect(b * pieceWidth + pieceWidth - 1, a * pieceHeight, 1, pieceHeight);
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(b * pieceWidth + pieceWidth - 1, a * pieceHeight + 1);
		ctx.lineTo(b * pieceWidth + pieceWidth - 1, a * pieceHeight + pieceHeight - 1);
		ctx.strokeStyle = "green";
		ctx.stroke();
	} else {
		ctx.clearRect(b * pieceWidth, a * pieceHeight + pieceHeight -1, pieceWidth, 1);
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(b * pieceWidth + 1, a * pieceHeight + pieceHeight - 1);
		ctx.lineTo(b * pieceWidth + pieceWidth - 1,  a * pieceHeight + pieceHeight - 1);
		ctx.strokeStyle = "green";
		ctx.stroke();
	}
}

function PairToIndex(y , x) {
	return x + y * 20
}

function IndexToPair(position) {
	return [position % 20, Math.floor(position / 20)]
}
//original shuffle found in stack overflow
function shuffle(a) {
  for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
  return a;
}
