//FONT
let font;
function preload() {
    DegularDisplay = loadFont("fonts/DegularDisplay-Regular.otf");
    DegularDisplaySemiB = loadFont("fonts/DegularDisplay-Semibold.otf");
}

//GRID
let gridWidth, gridHeight;
let segments = 9;
let segmentSizeX;
let segmentSizeY;

//INTERACTION
let clicked = false;
let intersected1 = false;
let intersected2 = false;
let intersected3 = false;
let intersected4 = false;
let intersected5 = false;
let intersected6 = false;
let intersected7 = false;
let moveSpeed = 0.2;
let slowSpeed = 0.02;
let superSpeed = 0.4;
let myMouseX;
let myMouseY;

//NAMES
const names = ['Ben', 'Leon', 'Lena', 'Emilia', 'Elias', 'Finn', 'Maximilian', 'Marie', 'Sophie', 'Johannes', 'Julian', 'Felix', 'Luisa', 'Anna', 'Emma', 'Hannah', 'Lea', 'Nina', 'Tobias', 'Laura', 'Paula', 'Paul', 'Alexander', 'Moritz', 'David', 'Jonas', 'Jakob', 'Matthias', 'Sarah', 'Natalie', 'Helen', 'Jana', 'Maria', 'Lisa', 'Jasmin', 'Diana', 'Katrin', 'Claudia', 'Tanja', 'Dominik', 'Kevin', 'Jan', 'Michael', 'Florian', 'Bastian', 'Christoph', 'Sebastian', 'Stefan', 'Markus'];
let currentName = "";
let currentPosition;

let attributes = ["be", "work", "meet", "create", "chill"];
let currentAttribute = "be";

//POINTS
let pointX = [];
let pointY = [];
let targetX = [];
let targetY = [];

function setup() {

  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  //Start position of mouse should be in the center
  myMouseX = windowWidth/2; 
  myMouseY = windowHeight/2;

  gridMarginX = 20; 
  gridMarginTop = 80;
  gridMarginBottom = 20;
  segmentSizeX = (windowWidth-gridMarginX)/segments;
  segmentSizeY = (windowHeight-gridMarginTop-gridMarginBottom)/segments;

  gridWidth = floor((width-gridMarginX) / segmentSizeX) +1; //8
  gridHeight = floor((height-gridMarginTop-gridMarginBottom) / segmentSizeX); //4

  //INITIAL POINTS FOR SHAPE
  pointX[1] = floor(random(gridWidth/segments*3)) * segmentSizeX + gridMarginX/2;
  pointY[1] = floor(random(gridWidth/segments*3)) * segmentSizeY + gridMarginTop;
  pointX[2] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeX + gridMarginX/2;
  pointY[2] = floor(random(gridWidth/segments*3)) * segmentSizeY + gridMarginTop;
  pointX[3] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX + gridMarginX/2;
  pointY[3] = floor(random(gridWidth/segments*3)) * segmentSizeY + gridMarginTop;
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
  setTimeout(showRandomAttribute, 3000); // show a random attribute after 3 seconds  
}

function draw() {
  background(255);

  //Detach Mouse interaction when outside certain area
  let prevMouseX = myMouseX;
  let prevMouseY = myMouseY;
  
  if (mouseX < gridMarginX || mouseY < gridMarginTop || mouseX > width-gridMarginX || mouseY > height - gridMarginBottom) {
    // if the current position is outside the canvas bounds, don't update the current position
    myMouseX = prevMouseX;
    myMouseY = prevMouseY;
  } else {
    // otherwise, update the previous position to the current position
    myMouseX = mouseX;
    myMouseY = mouseY;
  }   
  
  //Grid Helper
  stroke(0);
  strokeWeight(1);

  //Verticals |
  //for (let x = gridMarginX/2; x <=  width-gridMarginX/2; x += segmentSizeX) {
  //  line(x, gridMarginTop, x, height-gridMarginX);
  //}

  //Horizontals _
  //for (let y = gridMarginTop; y <=  height-gridMarginBottom; y += segmentSizeY) {
  //  line(gridMarginX/2, y, width-gridMarginX/2, y);
  //}
  
  //Shape color
  if (clicked) {
    fill(0); 
  } else {
    fill(255);
  }

  stroke(0);
  strokeWeight(2);
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
    targetX[1] = floor(random(gridWidth/segments*3)) * segmentSizeX + gridMarginX/2;
    targetY[1] = floor(random(gridWidth/segments*3)) * segmentSizeY + gridMarginTop;
  } else {
    if (intersected1 == true || intersected7 == true){
      moveSpeed = superSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[1] += (targetX[1] - pointX[1]) * moveSpeed;
    pointY[1] += (targetY[1] - pointY[1]) * moveSpeed;
  }

  if (dist(pointX[2], pointY[2], targetX[2], targetY[2]) < 1) {
    targetX[2] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeX + gridMarginX/2;
    targetY[2] = floor(random(gridWidth/segments*3)) * segmentSizeY + gridMarginTop;
  } else {
    if (intersected1 == true || intersected2 == true){
      moveSpeed = superSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[2] += (targetX[2] - pointX[2]) * moveSpeed;
    pointY[2] += (targetY[2] - pointY[2]) * moveSpeed;
  }

  if (dist(pointX[3], pointY[3], targetX[3], targetY[3]) < 1) {
    targetX[3] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX + gridMarginX/2;
    targetY[3] = floor(random(gridWidth/segments*3)) * segmentSizeY + gridMarginTop;
  } else {
    if (intersected2 == true || intersected3 == true){
      moveSpeed = superSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[3] += (targetX[3] - pointX[3]) * moveSpeed;
    pointY[3] += (targetY[3] - pointY[3]) * moveSpeed;
  }

  if (dist(pointX[4], pointY[4], targetX[4], targetY[4]) < 1) {
    targetX[4] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX + gridMarginX/2;
    targetY[4] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY + gridMarginTop;
  } else {
    if (intersected3 == true || intersected4 == true){
      moveSpeed = superSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[4] += (targetX[4] - pointX[4]) * moveSpeed;
    pointY[4] += (targetY[4] - pointY[4]) * moveSpeed;
  }

  if (dist(pointX[5], pointY[5], targetX[5], targetY[5]) < 1) {
    targetX[5] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX + gridMarginX/2;
    targetY[5] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY + gridMarginTop;
  } else {
    if (intersected4 == true || intersected5 == true){
      moveSpeed = superSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[5] += (targetX[5] - pointX[5]) * moveSpeed;
    pointY[5] += (targetY[5] - pointY[5]) * moveSpeed;
  }

  if (dist(pointX[6], pointY[6], targetX[6], targetY[6]) < 1) {
    targetX[6] = floor(random(gridWidth/segments*3)) * segmentSizeX + gridMarginX/2;
    targetY[6] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY + gridMarginTop;
  }  else {
    if (intersected6 == true){
      moveSpeed = superSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[6] += (targetX[6] - pointX[6]) * moveSpeed;
    pointY[6] += (targetY[6] - pointY[6]) * moveSpeed;
  }

  if (dist(pointX[7], pointY[7], targetX[7], targetY[7]) < 1) {
    targetX[7] = floor(random(gridWidth/segments*3)) * segmentSizeX + gridMarginX/2;
    targetY[7] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY + gridMarginTop;
  } else {
    if (intersected7 == true || intersected6 == true){
      moveSpeed = superSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[7] += (targetX[7] - pointX[7]) * moveSpeed;
    pointY[7] += (targetY[7] - pointY[7]) * moveSpeed;
  }

  //INTERSECTION LOGIC

  if (intersect(point0, point6, point1, point2) || intersect(point0, point5, point1, point2)) {
    intersected1 = true;
    targetY[1] = floor(random(myMouseY/segmentSizeY)) * segmentSizeY + gridMarginTop;
    targetY[2] = floor(random(myMouseY/segmentSizeY)) * segmentSizeY + gridMarginTop;
  } else {
    intersected1 = false;
  }

  if (intersect(point0, point6, point2, point3) || intersect(point0, point5, point2, point3)) {
    intersected2 = true;
    targetY[2] = floor(random(myMouseY/segmentSizeY)) * segmentSizeY + gridMarginTop;
    targetY[3] = floor(random(myMouseY/segmentSizeY)) * segmentSizeY + gridMarginTop;
  } else {
    intersected2 = false;
  }

  if (intersect(point0, point6, point3, point4) || intersect(point0, point5, point3, point4)) {
    intersected3 = true;
    targetX[3] = width-20;
    targetY[3] = 80;
    targetX[4] = width-20;
  } else {
    intersected3 = false;
  }

  if (intersect(point0, point6, point4, point5)) {
    intersected4 = true;
    targetX[4] = width-20;
    
    targetX[5] = width-20;
    targetY[5] = height-20;
   
  } else {
    intersected4 = false;
  }

  if (intersect(point0, point6, point4, point5)) {
    intersected5 = true;
    targetX[4] = width-20;
    
    targetX[5] = width-20;
    targetY[5] = height-20;
   
  } else {
    intersected5 = false;
  }

  if (intersect(point0, point5, point6, point7)) {
    intersected6 = true;
    targetX[6] = 20;
    targetY[6] = height-20;
    
    targetX[7] = 20;
  } else {
    intersected6 = false;
  }


  if (intersect(point0, point6, point7, point1) || intersect(point0, point5, point7, point1)) {
    intersected7 = true;
    targetX[7] = 20;
    
    targetX[1] = 20;
    targetY[1] = 80;
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


  //HELPER LINES FOR INTERSECTION LOGIC
  //stroke("green");
  //line(pointX[1], pointY[1], pointX[2], pointY[2]);

  //stroke("blue");
  //line(pointX[2], pointY[2], pointX[3], pointY[3]);

  //stroke("red");
  //line(pointX[3], pointY[3], pointX[4], pointY[4]);
  
  //stroke("pink");
  //line(pointX[4], pointY[4], pointX[5], pointY[5]);
  
  //stroke("grey");
  //line(pointX[6], pointY[6], pointX[7], pointY[7]);

  //stroke("orange");
  //line(pointX[7], pointY[7], pointX[1], pointY[1]);
    
  
  stroke("black");


  //TEXT
  noStroke();
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

  
  text(currentName, pointX[currentPosition] + 5, pointY[currentPosition]);

  textSize(windowWidth*windowHeight/5500);
  textFont(DegularDisplay);
  textAlign(RIGHT, BOTTOM)
  text("place to", width*0.98, height-windowWidth/9);
  text(currentAttribute, width*0.98, height);

  //MOUSE POSITION FOR CTA POSITION IN HTML/CSS
  var r = document.querySelector(':root');
  r.style.setProperty('--myMouseY', (myMouseY) + String("px"));
  r.style.setProperty('--myMouseX', (myMouseX) + String("px"));
}

function myFunction() { 

  const rotated = document.getElementById("plus");

  if (clicked == false) { 
    clicked = true;

    document.getElementById("label").style.display =  "none";  
    document.getElementById("myInput").style.display =  "block";  
    document.getElementById("joinButton").style.display =  "block";  
    document.getElementById("plus").style.display =  "none";  
    document.getElementById("face").style.display =  "block";  
    
    
    //rotated.style.transform = 'rotate(45deg)';
    
    noLoop();  

  } else {
    clicked = false;

    document.getElementById("label").style.display =  "block";  
    document.getElementById("myInput").style.display =  "none";   
    document.getElementById("joinButton").style.display =  "none"; 
    document.getElementById("plus").style.display =  "block";  
    document.getElementById("face").style.display =  "none";  

    //rotated.style.transform = 'rotate(90deg)';

    loop();
    }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  segmentSizeX = (windowWidth-gridMarginX)/segments;
  segmentSizeY = (windowHeight-gridMarginTop-gridMarginBottom)/segments;
}

function showRandomAttribute() {
  currentAttribute = attributes[Math.floor(Math.random() * attributes.length)]; // pick a random attribute from the array
  setTimeout(showRandomAttribute, 3000); // hide the name after 5 seconds
}

function showRandomName() {
  currentName = names[Math.floor(Math.random() * names.length)] + String(" joined."); // pick a random name from the array
  currentPosition = round(random(1,7));
  
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