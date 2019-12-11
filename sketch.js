var face;
var faceArray = [];

function preload(){
  face = loadModel("assets/faceMesh.obj",true);
}

function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  angleMode(DEGREES);

  for(var i = 0; i<=10; i++){
    var faceInSpace = new Face();
    faceArray.push(faceInSpace);
  }
}

function draw() {
  background('black');
  noStroke();
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  var mousedistance = dist(mouseX,mouseY,windowWidth/2,windowHeight/2);
  pointLight(250, 10, 250, locX, locY, 50);
  pointLight(10, 250, 250, -locX, -locY, 50);
  rotateZ(180);
  push();
  rotateX(frameCount+mousedistance*0.1);
  rotateY(frameCount+mousedistance*0.1);
  rotateZ(frameCount+mousedistance*0.1);
  model(face);
  pop();

  for(var i=0;i<faceArray.length;i++){
    faceArray[i].positioning();
  }

}

function Face(){
  this.faceX = random(-width/2, width/2);
  this.faceY = random(-height/2, height/2);
  this.faceZ = random(-20,10);
  this.size = random(0.5,1);
  this.rotationSpeed = random(-1,1);
  this.rotationOrigin = random(-360,360);

  this.positioning = function(){
    push();
    scale(this.size);
    rotateX(frameCount*this.rotationSpeed+this.rotationOrigin);
    rotateY(frameCount*this.rotationSpeed+this.rotationOrigin);
    rotateZ(frameCount*this.rotationSpeed+this.rotationOrigin);
    translate(this.faceX,this.faceY,this.faceZ);
    model(face);
    pop();
  }

}
