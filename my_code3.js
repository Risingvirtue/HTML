$(document).ready(function() {
	//mousedown, mouseup, click, mouseenter, mouseleave
	$("h1").mouseenter(function() {
		$(this).css("background-color", "red");
		
	});
	
	$("h1").mouseleave(function() {
			$(this).css("background-color", "cyan");
			//events have been removed
			$("*").unbind("mouseleave");
		
	});
});