var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

//create pixels
var pixelList = [];
for (b = 0; b < 255; b = b + 5) {
	pixelList.push(colorToHex(255, 0, b))
}

for (r = 255; r > 0; r = r - 5) {
	pixelList.push(colorToHex(r, 0, 255))
}

for (g = 0; g < 255; g = g + 5) {
	pixelList.push(colorToHex(0, g, 255))
}

for (b = 255; b > 0; b = b - 5) {
	pixelList.push(colorToHex(0, 255, b))
}

for (r = 0; r < 255; r = r + 5) {
	pixelList.push(colorToHex(r, 255, 0))
}

for (g = 255; g > 0; g = g - 5) {
	pixelList.push(colorToHex(255, g, 0))
}
var pixelCol = [];
var colorIndexArray = [];
var imageTemplate = new Image(306, 306);
imageTemplate.src = 'template3.png';


for (var i = 0; i < 306; i++) {
	var scramble = shuffle(pixelList);
	//copy of array to not point to same object
	pixelCol[i] = [].concat(scramble);
	initialize(scramble, i);
}

//initialize
function initialize(scramble, number) {
	var colorIndexWidth = {};
	for (var i = 0; i < 306; i++) {
		ctx.fillStyle = scramble[i];
		ctx.fillRect(number,i,1,1);
		colorIndexWidth[HexToRGB(scramble[i])] = [number, i];
	}
	colorIndexArray.push(colorIndexWidth);
}

//console.log(HexToRGB("#123456"))
//steps through each timeStep
$(document).ready(function() {
    var refresh = setInterval(timeStep, 100);
});

function timeStep() {
	var counter = 0
	ctx.clearRect(0 , 0, 306, 306);
	ctx.drawImage(imageTemplate, 0, 0, 306, 306);
	for (pList of pixelCol) {
		movePixel(pList, counter);
		counter++;
	}
}

function movePixel(pixelList, counter) {
	var colorIndexWidth = colorIndexArray[counter];
	for (color of pixelList) {
		var colorRGB = HexToRGB(color)
		var colorArray = colorRGB;
		var currIndex = colorIndexWidth[colorRGB][0];
		var height = colorIndexWidth[colorRGB][1];
		var actualIndex = colorToIndex(colorArray[0], colorArray[1], colorArray[2]);

		//sorts each pixel to correct place
		if (currIndex < actualIndex) {
			ctx.fillStyle = color;
			ctx.fillRect(currIndex + 1, height, 1, 1);
			colorIndexWidth[colorRGB][0] += 1
		} else if (currIndex > actualIndex) {
			ctx.fillStyle = color;
			ctx.fillRect(currIndex - 1, height, 1, 1);
			colorIndexWidth[colorRGB][0] -= 1
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(currIndex, height, 1, 1);
		}
	}
}

//console.log(colorToIndex(0, 5, 255))
//console.log(pixelList[colorToIndex(0, 5, 255)])

//helper functions
function HexToRGB(hex) {
	return [stringToNum(hex[1]) * 16 + stringToNum(hex[2]),
					stringToNum(hex[3]) * 16 + stringToNum(hex[4]),
					stringToNum(hex[5]) * 16 + stringToNum(hex[6])]
}

function stringToNum(hex) {
	if (hex =="A") {
		return 10
	} else if (hex == "B") {
		return 11
	} else if (hex == "C") {
		return 12
	} else if (hex == "D") {
		return 13
	} else if (hex == "E") {
		return 14
	} else if (hex == "F") {
		return 15
	} else {
		return parseInt(hex)
	}
}

function colorToIndex(r, g, b) {
	if (g == 0) {
		return Math.floor((255 - r) / 5) + Math.floor(b / 5)
	} else if (r == 0) {

		return (51 + 51) + Math.floor(g / 5)  + Math.floor((255 - b) / 5)
	} else {

		return (51 + 51 + 51 + 51) + Math.floor(r / 5) + Math.floor((255 - g) / 5)
	}
}

function colorToHex(r, g, b) {
	return "#" + numberToHex(r) + numberToHex(g) + numberToHex(b)
}

function numberToHex(number) {
	var ones = aboveNine(number % 16);
	var tens = aboveNine(Math.floor(number / 16));
	return tens.toString() + ones.toString()
}

function aboveNine(number) {
	if (number <= 9) {
		return number
	} else if (number == 10) {
			return "A"
	}	else if (number == 11) {
			return "B"
	} else if (number == 12) {
			return "C"
	} else if (number == 13) {
			return "D"
	} else if (number == 14) {
			return "E"
	}	else if (number == 15) {
			return "F"
	}
}


//shuffle array from stackoverflow Fisher-Yates
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
