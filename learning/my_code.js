$(document).ready(function() {
	//hide the p tags
	$("p").hide();
	
	$("h1").click(function() {
		$(this).next().slideToggle(300);
	});


});
