move = 0;
var t;
var y;
var x;
var iteration = 0;

function startScroll(gif){
	t = setInterval(function () { scroll(gif);}, 5);
	console.log(gif.height);
}

function stopScroll(gif){
	clearInterval(t);
}

function scroll(gif){
	if(move < ((gif.height * -1) + 128.5)){
		move = 0;
	}
	move = move - 0.2;
	gif.style.marginTop = move.toString() + "px";
}

function playGif(gif){
	clearInterval(x);
	y = setInterval(function () { loop(gif, false);}, 80);
}

function stopGif(gif){
	clearInterval(y);
	x = setInterval(function () {loop(gif, true);}, 80);
}

function loop(gif, backwards){
	if(backwards){
		iteration--;
	}
	if(!backwards){
		iteration++;
	}
	if(iteration < 1){
		iteration = 1;
		clearInterval(x);
		clearInterval(y);
	}
	
	document_gif = document.getElementById("hover-gif");
	document_gif.src = "gifs/" + iteration.toString() + ".gif";
	if(iteration >= 9){
		iteration = 6;
	}
	
	
	
	if(backwards && iteration == 1){
		clearInterval(x);
		iteration = 1;
	}
	
}