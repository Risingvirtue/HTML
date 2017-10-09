$(document).ready(function() {
	$("#testbutton, p").click(function() {
		//use * to select all
		//div > p select all p elements that are children of div tags
		//div strong select all strong elements that are decendents of div
		//every other p:even
		$("div > p:first-child").css("background-color", "red");
		$("#third").css("background-color", "cyan");
		$("strong.multiple").css("background-color", "green");
		$(this).css("background-color", "red");
	});
});