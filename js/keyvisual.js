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
let intersected7 = false;
let intersected8 = false;
let moveSpeed = 0.2;
let slowSpeed = 0.02;
let superSpeed = 0.4;
let myMouseX;
let myMouseY;

let jsonData;

//NAMES
const names = ['Malte', 'Frank', 'Gerd', 'Otto', 'Alicia', 'Nadine', 'Helene', 'Pauline', 'Anni', 'Marco', 'Nico', 'Daniel', 'Johannes', 'Alex', 'Ben', 'Ronny', 'Manuela', 'Sascha', 'Marc', 'Markus'];

let currentName = "";
let currentPosition;

let attributes = ["be", "meet", "connect", "work", "network", "relax", "create", "live", "focus", "hang out", "workout", "experience", "celebrate", "be" ];

let currentAttribute = "be";

//POINTS
let pointX = [];
let pointY = [];
let targetX = [];
let targetY = [];

function setup() {


  var canvas = createCanvas(windowWidth-10, windowHeight);
  canvas.parent('canvas-container');
  canvas.style('display', 'block');
  frameRate(60);

  //Start position of mouse should be in the center
  myMouseX = windowWidth/2; 
  myMouseY = windowHeight/2;

  gridMarginX = 20; 
  gridMarginTop = 80;
  gridMarginBottom = 20;
  segmentSizeX = (windowWidth-10-gridMarginX)/segments;
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

  pointX[6] = myMouseX;
  pointY[6] = myMouseY;

  pointX[7] = floor(random(gridWidth/segments*3)) * segmentSizeX;
  pointY[7] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY;
  pointX[8] = floor(random(gridWidth/segments*3)) * segmentSizeX;
  pointY[8] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY;



  for (i = 1; i < 9; i++) {
    
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

  pointX[6] = myMouseX;
  pointY[6] = myMouseY;

  // Switch Label and Button to the left to prevent overflow
  let joinWidth = joinButton.offsetWidth;
  let labelWidth = label.offsetWidth;
  let ctaWidth;

  if (joinWidth < labelWidth) {
    ctaWidth = labelWidth + plus.offsetWidth;
  } else {
    ctaWidth = joinWidth + plus.offsetWidth;
  }

  if (mouseX + ctaWidth > windowWidth-10 ) {
    label.classList.add("switch-to-left");
    joinButton.classList.add("switch-to-left");
  } else {
    label.classList.remove("switch-to-left");
    joinButton.classList.remove("switch-to-left");
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

  

  let point1 = createVector(pointX[1], pointY[1]);
  let point2 = createVector(pointX[2], pointY[2]);
  let point3 = createVector(pointX[3], pointY[3]);
  let point4 = createVector(pointX[4], pointY[4]);

  let point6 = createVector(pointX[6], pointY[6]);

  let point5 = createVector(pointX[5], pointY[5]);
  let point7 = createVector(pointX[7], pointY[7]);
  let point8 = createVector(pointX[8], pointY[8]);

  //ANIMATION AND INTERSECTION WITH MOUSE - LOGIC

  if (dist(pointX[1], pointY[1], targetX[1], targetY[1]) < 1) {
    targetX[1] = floor(random(gridWidth/segments*3)) * segmentSizeX + gridMarginX/2;
    targetY[1] = floor(random(gridWidth/segments*3)) * segmentSizeY + gridMarginTop;
  } else {
    if (intersected1 == true || intersected8 == true){
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

  if (dist(pointX[7], pointY[7], targetX[7], targetY[7]) < 1) {
    targetX[7] = floor(random(gridWidth/segments*3)) * segmentSizeX + gridMarginX/2;
    targetY[7] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY + gridMarginTop;
  }  else {
    if (intersected7 == true){
      moveSpeed = superSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[7] += (targetX[7] - pointX[7]) * moveSpeed;
    pointY[7] += (targetY[7] - pointY[7]) * moveSpeed;
  }

  if (dist(pointX[8], pointY[8], targetX[8], targetY[8]) < 1) {
    targetX[8] = floor(random(gridWidth/segments*3)) * segmentSizeX + gridMarginX/2;
    targetY[8] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY + gridMarginTop;
  } else {
    if (intersected8 == true || intersected7 == true){
      moveSpeed = superSpeed;
    } else {
      moveSpeed = slowSpeed;
    }
    pointX[8] += (targetX[8] - pointX[8]) * moveSpeed;
    pointY[8] += (targetY[8] - pointY[8]) * moveSpeed;
  }

  //INTERSECTION LOGIC

  if (intersect(point6, point7, point1, point2) || intersect(point6, point5, point1, point2)) {
    intersected1 = true;
    targetY[1] = floor(random(myMouseY/segmentSizeY)) * segmentSizeY + gridMarginTop;
    targetY[2] = floor(random(myMouseY/segmentSizeY)) * segmentSizeY + gridMarginTop;
  } else {
    intersected1 = false;
  }

  if (intersect(point6, point7, point2, point3) || intersect(point6, point5, point2, point3)) {
    intersected2 = true;
    targetY[2] = floor(random(myMouseY/segmentSizeY)) * segmentSizeY + gridMarginTop;
    targetY[3] = floor(random(myMouseY/segmentSizeY)) * segmentSizeY + gridMarginTop;
  } else {
    intersected2 = false;
  }

  if (intersect(point6, point7, point3, point4) || intersect(point6, point5, point3, point4)) {
    intersected3 = true;
    targetX[3] = width-20;
    targetY[3] = 80;
    targetX[4] = width-20;
  } else {
    intersected3 = false;
  }

  if (intersect(point6, point7, point4, point5)) {
    intersected4 = true;
    targetX[4] = width-20;
    
    targetX[5] = width-20;
    targetY[5] = height-20;
   
  } else {
    intersected4 = false;
  }

  if (intersect(point6, point7, point4, point5)) {
    intersected5 = true;
    targetX[4] = width-20;
    
    targetX[5] = width-20;
    targetY[5] = height-20;
   
  } else {
    intersected5 = false;
  }

  if (intersect(point6, point5, point7, point8)) {
    intersected7 = true;
    targetX[7] = 20;
    targetY[7] = height-20;
    
    targetX[8] = 20;
  } else {
    intersected7 = false;
  }


  if (intersect(point6, point7, point8, point1) || intersect(point6, point5, point8, point1)) {
    intersected8 = true;
    targetX[8] = 20;
    
    targetX[1] = 20;
    targetY[1] = 80;
  } else {
    intersected8 = false;
  }
  


  //DRAW SHAPE
  beginShape();
    vertex(pointX[1], pointY[1]);
    vertex(pointX[2], pointY[2]);
    vertex(pointX[3], pointY[3]);
    vertex(pointX[4], pointY[4]);
    vertex(pointX[5], pointY[5]);
    vertex(myMouseX, myMouseY);
    vertex(pointX[7], pointY[7]);
    vertex(pointX[8], pointY[8]);
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
  //line(pointX[7], pointY[7], pointX[8], pointY[8]);

  //stroke("orange");
  //line(pointX[8], pointY[8], pointX[1], pointY[1]);
    
  
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
  textSize(32); 
  textAlign(LEFT, TOP)

  // NAMES
  text(currentName, pointX[currentPosition] + 5, pointY[currentPosition]);

  textSize(windowWidth*windowHeight/5500);
  textFont(DegularDisplay);
  textAlign(RIGHT, BOTTOM)
  text("place to", width*0.98, height-textAscent()*0.8);
  text(currentAttribute, width*0.98, height);

  //MOUSE POSITION FOR CTA POSITION IN HTML/CSS
  var r = document.querySelector(':root');
  r.style.setProperty('--myMouseY', (myMouseY) + String("px"));
  r.style.setProperty('--myMouseX', (myMouseX) + String("px"));
}

function myFunction() { 
  const label = document.getElementById("label");
  const joinButton = document.getElementById("joinButton");
  const plus = document.getElementById("plus");
  const close = document.getElementById("keyvis__close");

  if (clicked == false) { 
    clicked = true;
    label.style.display =  "none";  
    joinButton.style.display =  "block";  
    plus.style.display =  "none";  
    close.style.display =  "block";
    currentName = ""; // hide name
    noLoop();  

    // Save data to sessionStorage      
    sessionStorage.setItem("pointX", JSON.stringify(pointX));
    sessionStorage.setItem("pointY", JSON.stringify(pointY));

  } else {
    clicked = false;
    label.style.display =  "block";  
    joinButton.style.display =  "none"; 
    plus.style.display =  "block";  
    close.style.display =  "none";  
    loop();
    }
}

function windowResized(){
  resizeCanvas(windowWidth-10, windowHeight);
  segmentSizeX = (windowWidth-10-gridMarginX)/segments;
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
