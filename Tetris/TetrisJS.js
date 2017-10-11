
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");



//columns first then rows
var board = [];
for (var i = 0; i < 22; i++) {
  var falseArray = [];
  for (var j = 0; j < 10; j++) {
    falseArray.push(false);
  }
  board.push(falseArray);
}
console.log(board);
function resetBoard() {
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, canvas.width, canvas.height);
  drawWhiteLines();
}
function drawWhiteLines() {
  for (var i = 0; i <= 300; i = i + 30) {
    ctx.clearRect(i, 0, 1, 600);
  }
  for (var i =0; i <= 600; i = i+ 30) {
    ctx.clearRect(0, i, 300, 1);
  }
}
class box {
  constructor() {
    this.xPos = 4;
    this.yPos = -1;
    this.makeTrue();
  }
  makeTrue() {
    board[1][4] = true;
    board[1][5] = true;
    board[2][4] = true;
    board[2][5] = true;
  }
  drawImage() {
    if (this.yPos == -1) {
      ctx.clearRect(30 * this.xPos, 0, 30, 30);
      ctx.clearRect(30 * (this.xPos + 1), 0, 30, 30);
      ctx.fillStyle = "yellow";
      ctx.fillRect(30 * this.xPos, 0, 30, 30);
      ctx.fillRect(30 * (this.xPos + 1), 0, 30, 30);
    } else {
      ctx.clearRect(30 * this.xPos, 30 * this.yPos , 30, 30);
      ctx.clearRect(30 * (this.xPos + 1), 30 * this.yPos, 30, 30);
      ctx.clearRect(30 * this.xPos, 30 * (this.yPos + 1), 30, 30);
      ctx.clearRect(30 * (this.xPos + 1), 30 * (this.yPos + 1), 30, 30);
      ctx.fillStyle = "yellow";
      ctx.fillRect(30 * this.xPos, 30 * this.yPos , 30, 30);
      ctx.fillRect(30 * (this.xPos + 1), 30 * this.yPos, 30, 30);
      ctx.fillRect(30 * this.xPos, 30 * (this.yPos + 1), 30, 30);
      ctx.fillRect(30 * (this.xPos + 1), 30 * (this.yPos + 1), 30, 30);
    }
  }

  increment() {
    if (this.yPos != 18) {
      board[this.yPos + 2][this.xPos] = false;
      board[this.yPos + 2][this.xPos + 1] = false;
      this.yPos += 1;
      board[this.yPos + 2][this.xPos] = true;
      board[this.yPos + 2][this.xPos + 1] = true;
    }
  }

  movement(direction) {
    if (direction == '37') {
      if ((this.xPos != 0) && (board[this.yPos + 2][this.xPos - 1] == false) &&
       (board[this.yPos + 3][this.xPos - 1] == false)){
        board[this.yPos + 2][this.xPos + 1] = false;
        board[this.yPos + 3][this.xPos + 1] = false;
        board[this.yPos + 2][this.xPos - 1] = true;
        board[this.yPos + +3][this.xPos - 1] = true;
        this.xPos -= 1;
      }
    }
    if (direction == '39') {
      if ((this.xPos != 9) && (board[this.yPos + 2][this.xPos + 2] == false) &&
       (board[this.yPos + 3][this.xPos + 2] == false)){
        console.log(this.xPos);
        board[this.yPos + 2][this.xPos] = false;
        board[this.yPos + 3][this.xPos] = false;
        board[this.yPos + 2][this.xPos + 1] = true;
        board[this.yPos + 3][this.xPos + 1] = true;
        this.xPos += 1;
      }
    }
    console.log('curr board is: ', board);
    resetBoard();
    this.drawImage();
  }
}


var currShape = new box();
currShape.drawImage();
var shapes = [];
shapes.push(currShape);
setInterval(timeStep, 100);

function timeStep() {
  resetBoard();
  for (shape of shapes) {
    shape.increment();
    shape.drawImage();
  }
  drawWhiteLines();
}

document.onkeydown = checkKey;

function checkKey(e) {
  if (e.keyCode == '37' || e.keyCode == '39') {
    currShape.movement(e.keyCode);
  }

}
