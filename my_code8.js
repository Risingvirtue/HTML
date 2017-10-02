$(document).ready(function() {
	$("h1").click(function() {
		//.add will change for all p elements 
		//$("p").not("p.second")
		//.next == next sibling element 
		//$("h1").next("div") only after h1 tag
		//.prev, .parent .find("p") -find descendents
		//.first() - only for first element, .last()
		//.eq(1) - selects index
		$("p").eq(1).css("background-color", "red");
	});	
});