let font;
function preload() {
    DegularDisplay = loadFont("fonts/DegularDisplay-Regular.otf");
    DegularText = loadFont("fonts/DegularText-Medium.otf");
}

let gridSize = 150;
let gridWidth, gridHeight;

let clicked = false;
let moveSpeed = 0.04;

let circleSize = 10;
let circlePosition; 

let circleX = [];
let circleY = [];
let targetX = [];
let targetY = [];

let names = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Julie", "Lara"];
let currentName = "";
let locationsX = [(gridWidth/10*3), (gridWidth/10*3, gridWidth/10*6), (gridWidth/10*6, gridWidth), (gridWidth/10*6, gridWidth), (gridWidth/10*6, gridWidth), (gridWidth/10*3), (gridWidth/10*3)];
let locationsY = [(gridHeight/10*3), (gridHeight/10*3), (gridHeight/10*3), (gridHeight/10*3, gridHeight/10*6), (gridHeight/10*6, gridHeight), (gridHeight/10*6, gridHeight), (gridHeight/10*3, gridHeight/10*6)];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  
  gridWidth = floor(width / gridSize);
  gridHeight = floor(height / gridSize);

  for (i = 0; i < 7; i++) {
    circleX[i] = floor(random(gridWidth)) * gridSize + gridSize / 2;
    circleY[i] = floor(random(gridHeight)) * gridSize + gridSize / 2;
    targetX[i] = circleX[i];
    targetY[i] = circleY[i];
  }

  setTimeout(showRandomName, 5000); // show a random name after 5 seconds
}

function draw() {
  background(255);

  //Grid Helper
  //stroke(0);
  //strokeWeight(1);
  //for (let x = gridSize / 2; x <= width; x += gridSize) {
  //  line(x, 0, x, height);
  // }
  // for (let y = gridSize / 2; y <= height; y += gridSize) {
  //  line(0, y, width, y);
  // }
  
  //SHAPE LOOK
  if (clicked) {
    fill(0); 
  } else {
    fill(255);
  }

  stroke(0);
  strokeWeight(3);

  //CREATE SHAPE
  beginShape(TESS);
    for (i = 0; i < ; i++) {
      vertex(circleX[i], circleY[i]);
    }
    
    vertex(mouseX, mouseY);

    for (i = 6; i < 7; i++) {
      vertex(circleX[i], circleY[i]);
    }
    
  endShape(CLOSE);
  
  blendMode(NORMAL);

  //ANIMATION OF THE SHAPE
  for (i = 0; i < 7; i++) {
    if (dist(circleX[i], circleY[i], targetX[i], targetY[i]) < 1) {
      targetX[i] = floor(random(int(locationsX[i]))) * gridSize + gridSize / 2;
      targetY[i] = floor(random(int(locationsY[i]))) * gridSize + gridSize / 2;
    } else {
      circleX[i] += (targetX[i] - circleX[i]) * moveSpeed;
      circleY[i] += (targetY[i] - circleY[i]) * moveSpeed;
    }
  }

  //TEXT STYLING
  noStroke();
  if (clicked) {
    fill(255); 
    blendMode(DIFFERENCE);
  } else {
    fill(0);
    blendMode(NORMAL);
  }

  //PERSONS JOINING
  noStroke();
  textSize(20); 
  textAlign(LEFT, TOP)
  text(currentName, circleX[1], circleY[i]);

  //HEADER TODO: must be in index.html for nice breaks and responsibility but need the blending effect, which is only accessible in p5...
  textSize(200);
  textFont(DegularText);
  textAlign(RIGHT, BOTTOM)
  text("Raum", width-20, height-280)
  text("der", width-20, height-120)
  text("Veränderung", width-20, height)

  //MAP CTA BUTTON TO THE MOUSE
  var r = document.querySelector(':root');
  r.style.setProperty('--myMouseY', (mouseY) + String("px"));
  r.style.setProperty('--myMouseX', (mouseX) + String("px"));
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
    
}


function showRandomName() {
  currentName = names[Math.floor(Math.random() * names.length)] + String(" already joined."); // pick a random name from the array
  setTimeout(hideName, 5000); // hide the name after 5 seconds
  circlePosition = int(random(1,7));
}

function hideName() {
  currentName = ""; // clear the current name
  setTimeout(showRandomName, 5000); // show a new random name after 5 seconds
}