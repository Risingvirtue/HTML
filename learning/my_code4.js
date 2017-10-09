$(document).ready(function() {
	$("h2").css("background-color", "orange"); 
	//$("h2").hide();	
	//mousedown, mouseup, click, mouseenter, mouseleave
	$("h1").click(function() {
		//$ are selectors
		//hides in miliseconds, show, toggle, slideUp, slideDown-change height,slideToggle
		//fadeOut, fadeIn, .delay().fadeToggle, fadeTo(1000, 0-1) fade to an opacity
		//callback function, in succession
		$("h2").hide(1000, function() {
			$("h3").fadeOut(1000);
			});	
	});
});