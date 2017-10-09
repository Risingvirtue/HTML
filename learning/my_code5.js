$(document).ready(function() {
	$("h1").mouseover(function() {
		$("h2").animate( {
			//increase to size, can also use show, hide, toggle
			"font-size":"toggle", 
			"width": "50%",
			//must be relative, fixed, absolute increments by 100 px each time
			"left": "+=100px"
			//callback
		}, 1000, function() {
			$("h3").toggle(1000);	
		});
	});
});