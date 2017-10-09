$(document).ready(function() {
	//.text reads text and copies
	//var hText = "The heading text is " + $("#head1").text();
	var imageName = ["https://www.japantimes.co.jp/wp-content/uploads/2016/08/p11-schilling-your-a-20160901.jpg", 
					"https://images4.alphacoders.com/706/thumb-1920-706365.png", 
					"http://img1.ak.crunchyroll.com/i/spire4/3727644b109279e2cb405ac89b0f293f1452549294_full.jpg"]
	var	indexNum = 1;
	$("#picture").click(function() {
		$("#picture").fadeOut(300, function() {
			$("#picture").attr("src", imageName[indexNum]);
			indexNum = (indexNum + 1) % 3
			$("#picture").fadeIn(500);
		});
		
	});	
});