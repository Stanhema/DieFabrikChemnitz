//FONT
let font;
function preload() {
    DegularDisplay = loadFont("fonts/DegularDisplay-Regular.otf");
    DegularText = loadFont("fonts/DegularText-Medium.otf");
}

//GRID
let gridWidth, gridHeight;
let segments = 9;
let segmentSizeX;
let segmentSizeY;

//INTERACTION
let clicked = false;
let moveSpeed = 0.04;
let myMouseX;
let myMouseY;

//NAMES
let names = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Julie", "Lara"];
let currentName = "";

//POINTS
let pointX = [];
let pointY = [];
let targetX = [];
let targetY = [];

function setup() {

  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  gridMarginX = 20; 
  gridMarginTop = 80;
  gridMarginBottom = 20;
  segmentSizeX = (windowWidth-gridMarginX)/segments;
  segmentSizeY = (windowHeight-gridMarginTop-gridMarginBottom)/segments;

  gridWidth = floor((width-gridMarginX) / segmentSizeX) +1; //8
  gridHeight = floor((height-gridMarginTop-gridMarginBottom) / segmentSizeX); //4

  //INITIAL POINTS FOR SHAPE

  for (i = 1; i < 8; i++) {
    pointX[i] = floor(random(gridWidth/10*3)) * segmentSizeX + gridMarginX/2;
    pointY[i] = floor(random(gridWidth/10*3)) * segmentSizeY + gridMarginTop;
    targetX[i] = pointX[i];
    targetY[i] = pointY[i];
  }

  setTimeout(showRandomName, 5000); // show a random name after 5 seconds  
}

function draw() {
  background(255);

  //Detach Mouse interaction when outside certain area
  let prevMouseX = myMouseX;
  let prevMouseY = myMouseY;
  
  if (mouseX < gridMarginX || mouseY < gridMarginTop || mouseX > width-400 || mouseY > height - gridMarginBottom) {
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
  for (let x = gridMarginX/2; x <=  width-gridMarginX/2; x += segmentSizeX) {
    line(x, gridMarginTop, x, height-gridMarginX);
  }

  //Horizontals _
  for (let y = gridMarginTop; y <=  height-gridMarginBottom; y += segmentSizeY) {
    line(gridMarginX/2, y, width-gridMarginX/2, y);
  }
  
  //Shape color
  if (clicked) {
    fill(0); 
  } else {
    fill(255);
  }

  stroke(0);
  strokeWeight(3);
  blendMode(NORMAL);

  point0 = createVector(myMouseX, myMouseY);

  point1 = createVector(pointX[1], pointY[1]);
  point2 = createVector(pointX[2], pointY[2]);
  point3 = createVector(pointX[3], pointY[3]);
  point4 = createVector(pointX[4], pointY[4]);
  point5 = createVector(pointX[5], pointY[5]);
  point6 = createVector(pointX[6], pointY[6]);
  point7 = createVector(pointX[7], pointY[7]);

  //ANIMATION AND INTERSECTION WITH MOUSE - LOGIC

  if (dist(pointX[1], pointY[1], targetX[1], targetY[1]) < 1) {
    targetX[1] = floor(random(gridWidth/segments*3)) * segmentSizeX + gridMarginX/2;
    targetY[1] = floor(random(gridWidth/segments*3)) * segmentSizeY + gridMarginTop;
  } else if (intersect(point0, point5, point1, point2)) {
    fill("green");
    //targetX[1] = floor(random(segmentSizeX, myMouseX - segmentSizeX));
    //targetY[1] = floor(random(segmentSizeX, myMouseY - segmentSizeX)); 
    pointX[1] += (targetX[1] - pointX[1]) * moveSpeed;
    pointY[1] += (targetY[1] - pointY[1]) * moveSpeed;
  } else {
    pointX[1] += (targetX[1] - pointX[1]) * moveSpeed;
    pointY[1] += (targetY[1] - pointY[1]) * moveSpeed;
  }

  if (dist(pointX[2], pointY[2], targetX[2], targetY[2]) < 1) {
    targetX[2] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeX + gridMarginX/2;
    targetY[2] = floor(random(gridWidth/segments*3)) * segmentSizeY + gridMarginTop;
  } else if (intersect(point0, point5, point2, point3)) {
    fill("blue");
    //targetX[2] = floor(random(segmentSizeX, myMouseX - segmentSizeX));
    //targetY[2] = floor(random(segmentSizeX, myMouseY - segmentSizeX));
    pointX[2] += (targetX[2] - pointX[2]) * moveSpeed;
    pointY[2] += (targetY[2] - pointY[2]) * moveSpeed;
  } else {
    pointX[2] += (targetX[2] - pointX[2]) * moveSpeed;
    pointY[2] += (targetY[2] - pointY[2]) * moveSpeed;
  }

  if (dist(pointX[3], pointY[3], targetX[3], targetY[3]) < 1) {
    targetX[3] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX + gridMarginX/2;
    targetY[3] = floor(random(gridWidth/segments*3)) * segmentSizeY + gridMarginTop;
  } else if (intersect(point0, point5, point3, point4)) {
    fill("red");
    //targetX[3] = floor(random(segmentSizeX, myMouseX - segmentSizeX));
    //targetY[3] = floor(random(segmentSizeX, myMouseY - segmentSizeX));
    pointX[3] += (targetX[3] - pointX[3]) * moveSpeed;
    pointY[3] += (targetY[3] - pointY[3]) * moveSpeed;
  } else {
    pointX[3] += (targetX[3] - pointX[3]) * moveSpeed;
    pointY[3] += (targetY[3] - pointY[3]) * moveSpeed;
  }

  if (dist(pointX[4], pointY[4], targetX[4], targetY[4]) < 1) {
    targetX[4] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX + gridMarginX/2;
    targetY[4] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY + gridMarginTop;
  } else if (intersect(point6, point0, point4, point5)) {
    fill("pink");
    //targetX[4] = floor(random(segmentSizeX, myMouseX - segmentSizeX));
    //targetY[4] = floor(random(segmentSizeX, myMouseY - segmentSizeX));
    pointX[4] += (targetX[4] - pointX[4]) * moveSpeed;
    pointY[4] += (targetY[4] - pointY[4]) * moveSpeed;
  } else {
    pointX[4] += (targetX[4] - pointX[4]) * moveSpeed;
    pointY[4] += (targetY[4] - pointY[4]) * moveSpeed;
  }

  if (dist(pointX[5], pointY[5], targetX[5], targetY[5]) < 1) {
    targetX[5] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX + gridMarginX/2;
    targetY[5] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY + gridMarginTop;
  } else {
    pointX[5] += (targetX[5] - pointX[5]) * moveSpeed;
    pointY[5] += (targetY[5] - pointY[5]) * moveSpeed;
  }

  if (dist(pointX[6], pointY[6], targetX[6], targetY[6]) < 1) {
    targetX[6] = floor(random(gridWidth/segments*3)) * segmentSizeX + gridMarginX/2;
    targetY[6] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY + gridMarginTop;
  } else if (intersect(point0, point5, point6, point7)) {
    fill("grey");
    //pointX[7] += (targetX[7] - pointX[7]) * moveSpeed;
    //pointY[7] += (targetY[7] - pointY[7]) * moveSpeed;
  }  else {
    pointX[6] += (targetX[6] - pointX[6]) * moveSpeed;
    pointY[6] += (targetY[6] - pointY[6]) * moveSpeed;
  }

  if (dist(pointX[7], pointY[7], targetX[7], targetY[7]) < 1) {
    targetX[7] = floor(random(gridWidth/segments*3)) * segmentSizeX + gridMarginX/2;
    targetY[7] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY + gridMarginTop;
  } else if (intersect(point0, point5, point7, point1)) {
    fill("orange");
    pointX[7] += (targetX[7] - pointX[7]) * moveSpeed;
    pointY[7] += (targetY[7] - pointY[7]) * moveSpeed;
    //targetX[7] = floor(random(segmentSizeX, myMouseX - segmentSizeX));
    //targetY[7] = floor(random(segmentSizeX, myMouseY - segmentSizeX));
  } else {
    pointX[7] += (targetX[7] - pointX[7]) * moveSpeed;
    pointY[7] += (targetY[7] - pointY[7]) * moveSpeed;
  }

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
  stroke("green");
  line(pointX[1], pointY[1], pointX[2], pointY[2]);

  stroke("blue");
  line(pointX[2], pointY[2], pointX[3], pointY[3]);

  stroke("red");
  line(pointX[3], pointY[3], pointX[4], pointY[4]);
  
  stroke("pink");
  line(pointX[4], pointY[4], pointX[5], pointY[5]);
  
  stroke("grey");
  line(pointX[6], pointY[6], pointX[7], pointY[7]);

  stroke("orange");
  line(pointX[7], pointY[7], pointX[1], pointY[1]);
    
  
  stroke("black");


  //TEXT
  noStroke();
  if (clicked) {
    fill(255); 
    blendMode(DIFFERENCE);
  } else {
    fill(0);
    blendMode(NORMAL);
  }

  noStroke();
  textSize(20); 
  textAlign(LEFT, TOP)
  text(currentName, pointX[1] + 5, pointY[1]);

  textSize(windowWidth/7);
  textFont(DegularText);
  textAlign(RIGHT, BOTTOM)
  text("Raum", width*0.96, height-2*windowWidth/10);
  text("der", width*0.96, height-windowWidth/11);
  text("Veränderung", width*0.96, height);

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
    document.getElementById("join").style.display =  "block";  
    
    
    rotated.style.transform = 'rotate(45deg)';
    
    noLoop();  

  } else {
    clicked = false;

    document.getElementById("label").style.display =  "block";  
    document.getElementById("myInput").style.display =  "none";   
    document.getElementById("join").style.display =  "none"; 

    rotated.style.transform = 'rotate(90deg)';

    loop();
    }
}

function myJoinFunction() {
  clicked = false;
  document.getElementById("myInput").style.display =  "none";   
  document.getElementById("join").style.display =  "none"; 
  document.getElementById("toggle").style.display =  "none"; 
  document.getElementById("welcome").style.display =  "block"; 
  blendMode(NORMAL);
  loop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  segmentSizeX = (windowWidth-gridMarginX)/segments;
  segmentSizeY = (windowHeight-gridMarginTop-gridMarginBottom)/segments;
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