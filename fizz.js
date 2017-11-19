// *Fizz* Created a visual of soda fizz. Inspired by my odd love for the fizzy feeling you get from carbonated beverages. I figured out
// 98% of it. The trickiest part was figuring out how to move the bubbles with the movement of the mouse to cause a floating effect.
// I had to use the vector functions from p5 library and also used the p5.js drawing example. Also, I changed my style/format of 
// writing a class from foreverSquare. Not sure which one is good practice? But I'm going to stick
// to this one. Click-&-Drag-for-Fizz


////////////////////////////////////Variables/////////////////////////////////////////////
var bubble = [];
var current;
var previous;
var myFont;

///////////////////////////////////////////Default functions//////////////////////////////
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	current = createVector(0,0);
	previous = createVector(0,0);

}

function draw() {
	// background has to be above the font to see the font.
	background(247, 206, 143);
	noStroke();
  	fill(255);
  	textAlign(CENTER);
  	textSize(75);

	// grab mouse position
	current.x = mouseX;
	current.y = mouseY;

	// So after declaring vectors using createVector(the starting position to destination) you have to compute the vector, velocity
	// and acceleration. To do this, you need to use p5.Vector which help group these values. you can use methods to this 
	// which can be found here: https://p5js.org/reference/#/p5.Vector   sub() is subtract the two vectors. Not sure how sub
	// and mult() helps with the floating effect. This part was takin from example in "p5.js drawing.""
	var force = p5.Vector.sub(current, previous);
	// this makes it go to the right a little, where the mouse moves. But I can't figure out how to make
	// bubbles move every direction of the mouse. .003 to get that floating effecting
    force.mult(.003);
   
	// adding new bubbles as long as I hold down mouse to the array
	if(mouseIsPressed) {
		// adding bubbles to array as im holding down the mouse
		var b = new Bubbles(current, force);
		bubble.push(b);
		textSize(0);
	} 

	// going through that array to show it on the screen and moving it
	for(var i = 0; i < bubble.length; i++) {
		bubble[i].show();
		bubble[i].move();
		bubble[i].fade();
	}		
}

//////////////////////////////////////////////Bubbles Class//////////////////////////////////////////////
class Bubbles {
	// need the position of each bubble and force related to the mouse.
	constructor(position, force) {
		// ///////from example/////////////////////////////////
		this.position = createVector(position.x, position.y);
		this.velocity = createVector(force.x, force.y);
		this.drag = .95;
		// ////////from example///////////////////////////////
		this.size = 5;
		this.opac = 500;


	}

	show() {
		noStroke();
		fill(255, this.opac);
		// this.size*20 used so that bubble goes up. If I decreased the 20 the force is too strong and bubble would go to the right 
		// of the mouse and never go up.
		ellipse(this.position.x, this.position.y - (this.size*20), this.size);
	}

	// making it move up when created
	move() {
		// //////got from example///////////
		// move it
		this.position.add(this.velocity);
		// slow it down when you swish your mouse around creating force, need to drag it down for bubbles to slow down.
		this.velocity.mult(this.drag);
		// make bubble go up.
		// //////got from example///////////
		this.size += .05;
	}
	// at a certain size, decrease opacity to make it disappear
	fade() {
		if(this.size > 7){
			this.opac -= 1.7;
		}
	}
}





	



