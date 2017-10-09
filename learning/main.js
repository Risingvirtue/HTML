//recieving data on the fly == AJAX
//XMLHttpRequest
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");
btn.addEventListener("click", function() {
	var ourRequest = new XMLHttpRequest();
	//open(GET or POST, url
	ourRequest.open("GET", "https://learnwebcode.github.io/json-example/animals-1.json");
	//by default interprets data as plain text
	ourRequest.onload = function() {
	var ourData = JSON.parse(ourRequest.responseText);
	renderHTML(ourData);
	};
	ourRequest.send();
});

function renderHTML(data) {
	var htmlString = "";
	
	for (i = 0; i < data.length; i++) {
		htmlString += "<p>" + data[i].name + " is a " + data[i].species + " </p> ";
	}
	animalContainer.insertAdjacentHTML("beforeend", htmlString)
}