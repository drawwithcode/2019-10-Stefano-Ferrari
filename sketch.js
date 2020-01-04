var face; //3D face model
var faceArray = []; //Array of aces
var myArray = [-1, 1]; //Array for invert rotation etc.

function preload() {
  face = loadModel("assets/faceMesh.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);

  //filling the array of faces
  for (var i = 0; i <= 10; i++) {
    var faceInSpace = new Face();
    faceArray.push(faceInSpace);
  }
}

function draw() {
  background('black');
  noStroke();

  var locX = mouseX - width / 2;
  var locY = mouseY - height / 2;

  var rotX = map(mouseY, 0, windowHeight,-90, 90);
  var rotY = map(mouseX, 0, windowWidth, 90, -90);

  //create two lights in opposite direction
  pointLight(250, 10, 250, locX, locY, 50);
  pointLight(10, 250, 250, -locX, -locY, 50);
  //turn upside-down the faces
  rotateZ(180);

  push();
  rotateX(rotX);
  rotateY(rotY);
  model(face); //create the main face in the middle that follows the mouse pointer.
  pop();

  //display the array of faces
  for (var i = 0; i < faceArray.length; i++) {
    faceArray[i].positioning();
  }

}

function Face() {
  this.faceX = random(width / 6, width / 2) * random(myArray); //faces spawn randomly in space but far from the main face.
  this.faceY = random(height / 4, height / 2) * random(myArray);
  this.faceZ = random(-20, 10);
  this.size = random(0.5, 1);
  this.rotationSpeed = random(-1, 1) + random(myArray) * 0.1;  //rotation speed is never set to zero.
  this.rotationOrigin = random(-360, 360);

  this.positioning = function() {
    push();
    scale(this.size);
    rotateX(frameCount * this.rotationSpeed + this.rotationOrigin);
    rotateY(frameCount * this.rotationSpeed + this.rotationOrigin);
    rotateZ(frameCount * this.rotationSpeed + this.rotationOrigin);
    translate(this.faceX, this.faceY, this.faceZ);
    model(face);
    pop();
  }

}
