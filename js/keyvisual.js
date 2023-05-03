//FONT
let font;
function preload() {
    DegularDisplay = loadFont("fonts/DegularDisplay-Regular.otf");
    DegularText = loadFont("fonts/DegularText-Medium.otf");
}

let canvas;

//GRID
let gridWidth, gridHeight;
let segments = 9;
let segmentSizeX;
let segmentSizeY;

//POINTS
let pointX = [];
let pointY = [];
let targetX = [];
let targetY = [];

//INTERACTION
let clicked = false; //for blendstyle

let intersected1 = false;
let intersected2 = false;
let intersected3 = false;
let intersected4 = false;
let intersected5 = false;
let intersected6 = false;
let intersected7 = false;
let moveSpeed = 0.2;
let slowSpeed = 0.02;
let fastSpeed = 0.4;
let myMouseX;
let myMouseY;

//NAMES
let names = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Julie", "Lara"];
let currentName = "";

function setup() {

  frameRate(60)

  const canvasContainer = select('#canvas-container');
  const canvasWidth = canvasContainer.width;
  const canvasHeight = canvasContainer.height;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(canvasContainer); // Embed the canvas in the container
  canvas.addClass('bordered-canvas');

  //Start position of mouse should be in the center
  myMouseX = windowWidth/2; 
  myMouseY = windowHeight/2;

  segmentSizeX = windowWidth/segments; //How 
  segmentSizeY = windowHeight/segments;

  gridWidth = floor(width/segmentSizeX) +1; //8
  gridHeight = floor(height/segmentSizeX); //4

  //INITIAL POINTS FOR SHAPE
  pointX[1] = floor(random(gridWidth/segments*3)) * segmentSizeX;
  pointY[1] = floor(random(gridWidth/segments*3)) * segmentSizeY;
  pointX[2] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeX;
  pointY[2] = floor(random(gridWidth/segments*3)) * segmentSizeY;
  pointX[3] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX;
  pointY[3] = floor(random(gridWidth/segments*3)) * segmentSizeY;
  pointX[4] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX;
  pointY[4] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY;
  pointX[5] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX;
  pointY[5] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY;
  pointX[6] = floor(random(gridWidth/segments*3)) * segmentSizeX;
  pointY[6] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY;
  pointX[7] = floor(random(gridWidth/segments*3)) * segmentSizeX;
  pointY[7] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY;

  for (i = 1; i < 8; i++) {
    
    targetX[i] = pointX[i];
    targetY[i] = pointY[i];
  }

  setTimeout(showRandomName, 5000); // show a random name after 5 seconds  
}

function draw() {
  background(255);

  var root = document.querySelector(':root');

  const myPaddingTop = int(getComputedStyle(root).getPropertyValue('--myPaddingTop'));
  const myPadding = int(getComputedStyle(root).getPropertyValue('--myPadding'));

  //Detach Mouse interaction when outside shape area
  let prevMouseX = myMouseX;
  let prevMouseY = myMouseY;

 

  let mouseLimit = 30;
  if (mouseX < myPadding+mouseLimit || mouseY < myPaddingTop+mouseLimit || mouseX > width+myPadding-mouseLimit || mouseY > height-10) {
    // if the current position is outside the canvas bounds, don't update the current position
    myMouseX = prevMouseX;
    myMouseY = prevMouseY;
  } else {
    // otherwise, update the previous position to the current position
    myMouseX = mouseX;
    myMouseY = mouseY; //comes from canvas border-top
  }   

  //MOUSE POSITION FOR CTA POSITION IN HTML/CSS
  root.style.setProperty('--myMouseX', (myMouseX) + String("px"));
  root.style.setProperty('--myMouseY', (myMouseY) + String("px"));

  //Grid Helper
  //stroke(0);
  //strokeWeight(1);
  //Verticals |
  //for (let x = 0; x <=  width; x += segmentSizeX) {
  //  line(x, 0, x, height);
  //}
  //Horizontals _
  //for (let y = 0; y <=  height; y += segmentSizeY) {
  //  line(0, y, width, y);
  //}
  
  //Shape color
  if (clicked) {
    fill(0); 
  } else {
    fill(255);
  }

  stroke(0);
  strokeWeight(3);
  blendMode(BLEND);

  let point0 = createVector(myMouseX, myMouseY);

  let point1 = createVector(pointX[1], pointY[1]);
  let point2 = createVector(pointX[2], pointY[2]);
  let point3 = createVector(pointX[3], pointY[3]);
  let point4 = createVector(pointX[4], pointY[4]);
  let point5 = createVector(pointX[5], pointY[5]);
  let point6 = createVector(pointX[6], pointY[6]);
  let point7 = createVector(pointX[7], pointY[7]);

  //ANIMATION AND INTERSECTION WITH MOUSE - LOGIC

  if (dist(pointX[1], pointY[1], targetX[1], targetY[1]) < 1) {
    targetX[1] = floor(random(gridWidth/segments*3)) * segmentSizeX;
    targetY[1] = floor(random(gridWidth/segments*3)) * segmentSizeY;
  } else {
    if (intersected1 == true || intersected7 == true){
      moveSpeed = fastSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[1] += (targetX[1] - pointX[1]) * moveSpeed;
    pointY[1] += (targetY[1] - pointY[1]) * moveSpeed;
  }

  if (dist(pointX[2], pointY[2], targetX[2], targetY[2]) < 1) {
    targetX[2] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeX;
    targetY[2] = floor(random(gridWidth/segments*3)) * segmentSizeY;
  } else {
    if (intersected1 == true || intersected2 == true){
      moveSpeed = fastSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[2] += (targetX[2] - pointX[2]) * moveSpeed;
    pointY[2] += (targetY[2] - pointY[2]) * moveSpeed;
  }

  if (dist(pointX[3], pointY[3], targetX[3], targetY[3]) < 1) {
    targetX[3] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX;
    targetY[3] = floor(random(gridWidth/segments*3)) * segmentSizeY;
  } else {
    if (intersected2 == true || intersected3 == true){
      moveSpeed = fastSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[3] += (targetX[3] - pointX[3]) * moveSpeed;
    pointY[3] += (targetY[3] - pointY[3]) * moveSpeed;
  }

  if (dist(pointX[4], pointY[4], targetX[4], targetY[4]) < 1) {
    targetX[4] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX;
    targetY[4] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY;
  } else {
    if (intersected3 == true || intersected4 == true){
      moveSpeed = fastSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[4] += (targetX[4] - pointX[4]) * moveSpeed;
    pointY[4] += (targetY[4] - pointY[4]) * moveSpeed;
  }

  if (dist(pointX[5], pointY[5], targetX[5], targetY[5]) < 1) {
    targetX[5] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX;
    targetY[5] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY;
  } else {
    if (intersected4 == true || intersected5 == true){
      moveSpeed = fastSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[5] += (targetX[5] - pointX[5]) * moveSpeed;
    pointY[5] += (targetY[5] - pointY[5]) * moveSpeed;
  }

  if (dist(pointX[6], pointY[6], targetX[6], targetY[6]) < 1) {
    targetX[6] = floor(random(gridWidth/segments*3)) * segmentSizeX;
    targetY[6] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY;
  }  else {
    if (intersected6 == true){
      moveSpeed = fastSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[6] += (targetX[6] - pointX[6]) * moveSpeed;
    pointY[6] += (targetY[6] - pointY[6]) * moveSpeed;
  }

  if (dist(pointX[7], pointY[7], targetX[7], targetY[7]) < 1) {
    targetX[7] = floor(random(gridWidth/segments*3)) * segmentSizeX;
    targetY[7] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY;
  } else {
    if (intersected7 == true || intersected6 == true){
      moveSpeed = fastSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[7] += (targetX[7] - pointX[7]) * moveSpeed;
    pointY[7] += (targetY[7] - pointY[7]) * moveSpeed;
  }

  //INTERSECTION LOGIC

  if (intersect(point0, point6, point1, point2) || intersect(point0, point5, point1, point2)) {
    intersected1 = true;
    targetY[1] = round(random(myMouseY/segmentSizeY)) * segmentSizeY;
    targetY[2] = round(random(myMouseY/segmentSizeY)) * segmentSizeY;
  } else {
    intersected1 = false;
  }

  if (intersect(point0, point6, point2, point3) || intersect(point0, point5, point2, point3)) {
    intersected2 = true;
    targetY[2] = round(random(myMouseY/segmentSizeY)) * segmentSizeY;
    targetY[3] = round(random(myMouseY/segmentSizeY)) * segmentSizeY;
  } else {
    intersected2 = false;
  }

  if (intersect(point0, point6, point3, point4) || intersect(point0, point5, point3, point4)) {
    intersected3 = true;
    //targetX[3] = width-20;
    targetX[3] = round(random(myMouseX, width)/segmentSizeX) * segmentSizeX;
    targetY[3] = round(random(myMouseY/segmentSizeY)) * segmentSizeY;
    targetX[4] = round(random(myMouseX, width)/segmentSizeX) * segmentSizeX;

  } else {
    intersected3 = false;
  }

  if (intersect(point0, point6, point4, point5)) {
    intersected4 = true;
    targetX[4] = round(random(myMouseX, width)/segmentSizeX) * segmentSizeX;
    targetX[5] = round(random(myMouseX, width)/segmentSizeX) * segmentSizeX;   
  } else {
    intersected4 = false;
  }

  if (intersect(point0, point5, point6, point7)) {
    intersected6 = true;
    targetX[6] = round(random(myMouseX/segmentSizeX)) * segmentSizeX;    
    targetX[7] = round(random(myMouseX/segmentSizeX)) * segmentSizeX;
  } else {
    intersected6 = false;
  }

  if (intersect(point0, point6, point7, point1) || intersect(point0, point5, point7, point1)) {
    intersected7 = true;
    targetX[7] = round(random(myMouseX/segmentSizeX)) * segmentSizeX;
    targetX[1] = round(random(myMouseX/segmentSizeX)) * segmentSizeX;
    targetY[1] = round(random(myMouseY/segmentSizeY)) * segmentSizeY;
  } else {
    intersected7 = false;
  }
  
  //DRAW SHAPE
  beginShape();
    vertex(pointX[1], pointY[1]);
    vertex(pointX[2], pointY[2]);
    vertex(pointX[3], pointY[3]);
    vertex(pointX[4], pointY[4]);
    vertex(pointX[5], pointY[5]);
    vertex(myMouseX, myMouseY);
    vertex(pointX[6], pointY[6]);
    vertex(pointX[7], pointY[7]);
  endShape(CLOSE);    
  
  //TEXT
  if (clicked) {
    fill(255); 
    blendMode(DIFFERENCE);
  } else {
    fill(0);
    blendMode(BLEND);
  }

  noStroke();
  textSize(20); 
  textAlign(LEFT, TOP)
  text(currentName, pointX[1] + 5, pointY[1]);

  textSize(windowWidth/7);
  textFont(DegularText);
  textAlign(RIGHT, BOTTOM)
  text("place to", width*0.96, height-windowWidth/11);
  text("be", width*0.96, height);

  
}

function myFunction() { 

  const rotated = document.getElementById("plus");

  if (clicked == false) { 
    clicked = true;

    document.getElementById("label").style.display =  "none";  
    document.getElementById("myInput").style.display =  "block";  
    document.getElementById("joinButton").style.display =  "block";  
    
    
    rotated.style.transform = 'rotate(45deg)';
    
    noLoop();  

  } else {
    clicked = false;

    document.getElementById("label").style.display =  "block";  
    document.getElementById("myInput").style.display =  "none";   
    document.getElementById("joinButton").style.display =  "none"; 

    rotated.style.transform = 'rotate(90deg)';

    loop();
    }
}

function myJoinFunction() {
  clicked = false;
  document.getElementById("myInput").style.display =  "none";   
  document.getElementById("joinButton").style.display =  "none"; 
  document.getElementById("toggle").style.display =  "none"; 
  document.getElementById("welcome").style.display =  "block"; 
  blendMode(BLEND);
  loop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  segmentSizeX = (windowWidth)/segments;
  segmentSizeY = (windowHeight)/segments;
}


function showRandomName() {
  currentName = names[Math.floor(Math.random() * names.length)] + String(" joined."); // pick a random name from the array
  setTimeout(hideName, 5000); // hide the name after 5 seconds
}

function hideName() {
  currentName = ""; // clear the current name
  setTimeout(showRandomName, 5000); // show a new random name after 5 seconds
}


function intersect(a1, a2, b1, b2) {
  // Check if line segment a intersects line segment b
  let den = (b2.y-b1.y)*(a2.x-a1.x) - (b2.x-b1.x)*(a2.y-a1.y);
  if (den == 0) {
    return false;
  }
  let ua = ((b2.x-b1.x)*(a1.y-b1.y) - (b2.y-b1.y)*(a1.x-b1.x)) / den;
  let ub = ((a2.x-a1.x)*(a1.y-b1.y) - (a2.y-a1.y)*(a1.x-b1.x)) / den;
  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}
