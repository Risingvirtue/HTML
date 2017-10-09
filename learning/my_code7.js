$(document).ready(function() {
	$("h1").click(function() {
		//text - change text <b> == bold
		//html, style= "font-size
		//"div", everything from div element was replaced
		//empty()  .append (inside div) 
		//.after(outside div)  //after p would be after all the p elements
		//prepend, before, replaceWith
		//.attr("src", "floatingball.gif")
		$("p").replaceWith("<h2>next text</h2>");
	});
	
});