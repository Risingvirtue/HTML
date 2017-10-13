function cutName(name) {
  var currWord = "";
  var result = [];
  for (var i = 0; i < name.length; i++) {
    if (name[i] == " ") {
      result.push(currWord);
      currWord = "";
    } else {
      currWord += name[i];
    }
  }
  return result;
}

var arr = cutName("Douglas Crockford");
console.log(arr);