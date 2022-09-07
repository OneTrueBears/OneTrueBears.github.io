square_size = 23.3;
row_size = 5;
column_size = 5;
startX = window.innerWidth/2 - (square_size * column_size)/2;
startY = window.innerHeight/2 - (square_size * row_size)/2;

squares = [];

let margin = 3;

let iterate = 0;



function make_svg(x, y, width, height){
	var newsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	var svgns = newsvg.namespaceURI;
	newsvg.setAttribute("height", width);
	newsvg.setAttribute("width", height);
	newsvg.setAttribute("id", "container");
	//newsvg.style.position = "relative";
	//newsvg.style.top = "50%";
	//newsvg.style.left = "50%";
	//newsvg.style.transform = "translate(-50%, -50%)";
	return (document.body.appendChild(newsvg));
}


function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function populate(){
	iterate = iterate + 0.1;
	var svgns = "http://www.w3.org/2000/svg";
	for (let y = 0; y < column_size; y++){
		squares.push([]);
		for (let x = 0; x < row_size; x++){
			let v = parseInt(perlin.get(x + iterate, y + iterate) * 155 + 100);
			if(v>85){
				var rect = document.createElementNS(svgns, 'rect');
				rect.setAttributeNS( null,'x', x*(square_size + margin));
				rect.setAttributeNS( null,'y', y*(square_size + margin));
				rect.setAttributeNS( null,'width', square_size);
				rect.setAttributeNS( null,'height', square_size);
				rect.setAttributeNS( null,'fill','black');
				svg.appendChild(rect);
				squares[y].push(rect);
			}
			else{
				squares[y].push(null);
			}
		}
	}
}



function shift(){
	if(shift_direction > 4){
		shift_direction = 1;
	}
	
			
	if(shift_direction == 1){
		for(i = 0; i < row_size; i++){
			shift_up();
		}
	}
	
	else if(shift_direction == 2){
		for(i = 0; i < column_size; i++){
			shift_right();
		}
	}
	
	else if(shift_direction == 3){
		for(i = 0; i < row_size; i++){
			shift_down();
		}
	}
	
	else if(shift_direction == 4){
		for(i = 0; i < column_size; i++){
			shift_left();
		}
	}

	
	shift_direction++;
}

function shift_up(){
	for(var i=0; i < squares.length; i++){
		for(var j=0; j < squares[i].length; j++){
			if(squares[i][j] != null){
				if(i > 0){
					if(squares[i-1][j] == null){
						squares[i][j].setAttributeNS(null, 'y', (parseFloat(squares[i][j].getAttribute('y')) - parseFloat((square_size + margin))));
						squares[i-1][j] = squares[i][j];
						squares[i][j] = null;
					}
				}
			}
		}
	}
}

function shift_right(){
	for(var i=0; i < squares.length; i++){
		for(var j=0; j < squares[i].length; j++){
			if(squares[i][j] != null){
				if(j < column_size-1){
					if(squares[i][j+1] == null){
						squares[i][j].setAttributeNS(null, 'x', parseFloat(squares[i][j].getAttribute('x')) + parseFloat((square_size + margin)));
						squares[i][j+1] = squares[i][j];
						squares[i][j] = null;
					}
				}
			}
		}
	}
}

function shift_down(){
	for(var i=0; i < squares.length; i++){
		for(var j=0; j < squares[i].length; j++){
			if(squares[i][j] != null){
				if(i < 4){
					if(squares[i+1][j] == null){
						squares[i][j].setAttributeNS(null, 'y', (parseFloat(squares[i][j].getAttribute('y')) + parseFloat((square_size + margin))));
						squares[i+1][j] = squares[i][j];
						squares[i][j] = null;
					}
				}
			}
		}
	}
}

function shift_left(){
	for(var i=0; i < squares.length; i++){
		for(var j=0; j < squares[i].length; j++){
			if(squares[i][j] != null){
				if(j > 0){
					if(squares[i][j-1] == null){
						squares[i][j].setAttributeNS(null, 'x', parseFloat(squares[i][j].getAttribute('x')) - parseFloat((square_size + margin)));
						squares[i][j-1] = squares[i][j];
						squares[i][j] = null;
					}
				}
			}
		}
	}
}

shift_direction = 1;

svg = make_svg(0, 0, square_size*column_size + margin*(column_size-1), square_size*row_size + margin*(row_size-1));

populate();

hover = false;

svg.addEventListener('mouseenter', (event) => {});
svg.addEventListener('mouseleave', (event) => { hover = false });

onmouseover = (event) => {
	if(!hover){
		setInterval(shift(), 100);
	}
	hover = true;
};

svg.addEventListener('click', function(){ window.parent.location.href ="https://www.bjornarovstedal.com/creative_coding.html";}, false);

//setInterval(shift, 1000);