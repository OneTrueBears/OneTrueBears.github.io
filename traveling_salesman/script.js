var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var reading = false;
var readingNode;
var nodes = [];
var visited_nodes = [];
var articles = [];
var currentNode;
var startingNode;

//make a list of all the html articles, going from last to first.
for (i=12; i>0; i--){
	articles.push("a"+i);
}

function getMousePos(c, evt) {
        var rect = c.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
		}
    }

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//class structure for node.
class Node{
	constructor(x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		var clicked;
		this.clicked = false;
		var article;
		this.article = article;
		var prevNode;
		this.prevNode = prevNode;
		var nextNode;
		this.nextNode = nextNode;
	}
}

//generate and draw nodes randomly.
for(i=0; i<12; i++) {
	var x = getRndInteger(0 + canvas.width/10,canvas.width - canvas.width/10);
	var y = getRndInteger(0 + canvas.width/10,canvas.height - canvas.width/10);
	var radius = 5;
	
	if (!checkOverlap(x, y, radius)){
		var node = new Node(x, y, radius)
		nodes.push(node);
		drawNode(node);
	}
}

function drawNode(node){
	ctx.beginPath();
	ctx.arc(node.x, node.y, node.radius, Math.PI*2, 0, false);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

//check if a node overlaps with another
function checkOverlap(x, y, radius){
	if (nodes.length > 0){
		for(i = 0; i < nodes.length; i++){
			if ((nodes[i].x - nodes[i].radius*8 < x)&&(nodes[i].x + nodes[i].radius*8 > x)&&(nodes[i].y - nodes[i].radius*8 < y)&&(nodes[i].y + nodes[i].radius*8 > y)){
				return true;
			} 
		}
	}
	else{
		return false;
	}
}

//add lines between nodes. 
function traverse(node, previous_node){
	try {
		ctx.beginPath();
		ctx.moveTo(previous_node.x, previous_node.y);
		ctx.lineTo(node.x, node.y);
		ctx.strokeStyle = "#ebcb4d";
		ctx.setLineDash([10, 10]);
		ctx.lineWidth = 3;
		ctx.stroke();
		node.prevNode = previous_node;
		previous_node.nextNode = node;
		drawNode(previous_node);
		drawNode(node);
	}
	catch (e) {
		console.log(e);
	}
}

function fadeInText(element, baseOpacity) {
    element.style.display = 'flex';
	element.style.opacity = "100";
}

function fadeOutText(element, targetOpacity) {
	element.style.opacity = "0";
	setTimeout(element.style.display = "none", 1000);
}

function fadeInCanvas(element) {
	element.style.opacity = 1;
	element.style.filter = "blur(0px)";
}

function fadeOutCanvas(element) {
    var op = 1;  // initial opacity
	var bl = 0;  // initial blur
	element.style.opacity = 0.5;
	element.style.filter = "blur(1px)"; 
}

//clicking functionality
canvas.addEventListener('click', function(e) {
	//exit the current article by clicking anywhere not on the text.
	if(reading){
		//document.getElementById(readingNode.article).style.display = "none";
		fadeOutText(document.getElementById(readingNode.article), 0.0000001);
		//canvas.style.filter = "blur(0px)";
		//canvas.style.opacity = "1";
		fadeInCanvas(canvas);
		reading = false;
	}
	
	//clicking a node to bring up an article. Iterates through the nodes, checks if click is within the area of a node.
	else{
		nodes.forEach(function(node){
			if((node.x - 20 < e.pageX)&&(node.x + 20 > e.pageX)&&(node.y - 20 < e.pageY)&&(node.y + 20 > e.pageY)){
				node.clicked = true; 
				if(node.nextNode == undefined){
					visited_nodes.push(node);
					currentNode = node;
					traverse(currentNode, visited_nodes[visited_nodes.length - 2]);
				}
				if(startingNode == undefined){
					startingNode = node;
				}
				if((startingNode == node)&&(articles.length < 1)){
					traverse(startingNode, currentNode);
					console.log("You're done!");
				}
				readingNode = node;
				//canvas.style.filter = "blur(8px)";
				//canvas.style.opacity = "0.8";
				fadeOutCanvas(canvas);
				reading = true;
				if (node.article == undefined){
					node.article = articles.pop();
				}
				fadeInText(document.getElementById(node.article), 0.1)
			}
		});
	}
})
	



