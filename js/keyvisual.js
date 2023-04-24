let font;

function preload() {
    DegularDisplay = loadFont("fonts/DegularDisplay-Regular.otf");
    DegularText = loadFont("fonts/DegularText-Medium.otf");
}
let gridSize = 150;
let gridWidth, gridHeight;

let clicked = false;


let circleSize = 10;
let circle1X, circle1Y, circle2X, circle2Y;
let target1X, target1Y, target2X, target2Y;

let moveSpeed = 0.04;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  
  gridWidth = floor(width / gridSize);
  gridHeight = floor(height / gridSize);

  circle1X = floor(random(gridWidth)) * gridSize + gridSize / 2;
  circle1Y = floor(random(gridHeight)) * gridSize + gridSize / 2;
  target1X = circle1X;
  target1Y = circle1Y;

  circle2X = floor(random(gridWidth)) * gridSize + gridSize / 2;
  circle2Y = floor(random(gridHeight)) * gridSize + gridSize / 2;
  target2X = circle2X;
  target2Y = circle2Y;

  circle3X = floor(random(gridWidth)) * gridSize + gridSize / 2;
  circle3Y = floor(random(gridHeight)) * gridSize + gridSize / 2;
  target3X = circle3X;
  target3Y = circle3Y;

  circle4X = floor(random(gridWidth)) * gridSize + gridSize / 2;
  circle4Y = floor(random(gridHeight)) * gridSize + gridSize / 2;
  target4X = circle4X;
  target4Y = circle4Y;

  circle5X = floor(random(gridWidth)) * gridSize + gridSize / 2;
  circle5Y = floor(random(gridHeight)) * gridSize + gridSize / 2;
  target5X = circle5X;
  target5Y = circle5Y;

  circle6X = floor(random(gridWidth)) * gridSize + gridSize / 2;
  circle6Y = floor(random(gridHeight)) * gridSize + gridSize / 2;
  target6X = circle6X;
  target6Y = circle6Y;

  circle7X = floor(random(gridWidth)) * gridSize + gridSize / 2;
  circle7Y = floor(random(gridHeight)) * gridSize + gridSize / 2;
  target7X = circle7X;
  target7Y = circle7Y;
  
}

function draw() {
  background(255);


  //setInterval(function() {
  //  fill("black")
  //  circle(circle1X, circle1Y, circleSize);
  //  textSize(20); 
  //  textAlign(LEFT, TOP)
  //  text("Tim joined", circle1X + 20, circle1Y )
  //  }, 2000);
    
  //Grid Helper
  //stroke(0);
  //strokeWeight(1);
  //for (let x = gridSize / 2; x <= width; x += gridSize) {
  //  line(x, 0, x, height);
 // }
 // for (let y = gridSize / 2; y <= height; y += gridSize) {
  //  line(0, y, width, y);
 // }
  
  //Shape color
  if (clicked) {
    fill(0); 
  } else {
    fill(255);
  }

  stroke(0);
  strokeWeight(2);

  beginShape(TESS);
    vertex(circle1X, circle1Y);
    vertex(circle2X, circle2Y);
    vertex(circle3X, circle3Y);
    vertex(circle4X, circle4Y);
    vertex(circle5X, circle5Y);
    vertex(mouseX, mouseY);
    vertex(circle6X, circle6Y);
    vertex(circle7X, circle7Y);
  endShape(CLOSE);
  

    

  //CIRCLES
  //circle(circle1X, circle1Y, circleSize);
  //circle(circle2X, circle2Y, circleSize);
  //circle(circle3X, circle3Y, circleSize);
  //circle(circle4X, circle4Y, circleSize);
  //circle(circle5X, circle5Y, circleSize);
  //circle(circle6X, circle6Y, circleSize);
  //circle(circle7X, circle7Y, circleSize);
  blendMode(NORMAL);


  if (dist(circle1X, circle1Y, target1X, target1Y) < 1) {
    target1X = floor(random(gridWidth/10*3)) * gridSize + gridSize / 2;
    target1Y = floor(random(gridHeight/10*3)) * gridSize + gridSize / 2;
  } else {
    circle1X += (target1X - circle1X) * moveSpeed;
    circle1Y += (target1Y - circle1Y) * moveSpeed;
  }

  if (dist(circle2X, circle2Y, target2X, target2Y) < 1) {
    target2X = floor(random(gridWidth/10*3, gridWidth/10*6)) * gridSize + gridSize / 2;
    target2Y = floor(random(gridHeight/10*2)) * gridSize + gridSize / 2;
  } else {
    circle2X += (target2X - circle2X) * moveSpeed;
    circle2Y += (target2Y - circle2Y) * moveSpeed;
  }

  if (dist(circle3X, circle3Y, target3X, target3Y) < 1) {
    target3X = floor(random(gridWidth/10*6, gridWidth)) * gridSize + gridSize / 2;
    target3Y = floor(random(gridHeight/10*2)) * gridSize + gridSize / 2;
  } else {
    circle3X += (target3X - circle3X) * moveSpeed;
    circle3Y += (target3Y - circle3Y) * moveSpeed;
  }

  if (dist(circle4X, circle4Y, target4X, target4Y) < 1) {
    target4X = floor(random(gridWidth/10*6, gridWidth)) * gridSize + gridSize / 2;
    target4Y = floor(random(gridHeight/10*3, gridHeight/10*6)) * gridSize + gridSize / 2;
  } else {
    circle4X += (target4X - circle4X) * moveSpeed;
    circle4Y += (target4Y - circle4Y) * moveSpeed;
  }

  if (dist(circle5X, circle5Y, target5X, target5Y) < 1) {
    target5X = floor(random(gridWidth/10*6, gridWidth)) * gridSize + gridSize / 2;
    target5Y = floor(random(gridHeight/10*6, gridHeight)) * gridSize + gridSize / 2;
  } else {
    circle5X += (target5X - circle5X) * moveSpeed;
    circle5Y += (target5Y - circle5Y) * moveSpeed;
  }
  

  if (dist(circle6X, circle6Y, target6X, target6Y) < 1) {
    target6X = floor(random(gridWidth/10*3)) * gridSize + gridSize / 2;
    target6Y = floor(random(gridHeight/10*6, gridHeight)) * gridSize + gridSize / 2;
  } else {
    circle6X += (target6X - circle6X) * moveSpeed;
    circle6Y += (target6Y - circle6Y) * moveSpeed;
  }

 
  if (dist(circle7X, circle7Y, target7X, target7Y) < 1) {
    target7X = floor(random(gridWidth/10*3)) * gridSize + gridSize / 2;
    target7Y = floor(random(gridHeight/10*3, gridHeight/10*6)) * gridSize + gridSize / 2;
  } else {
    circle7X += (target7X - circle7X) * moveSpeed;
    circle7Y += (target7Y - circle7Y) * moveSpeed;
  }


    
 
  noStroke();
  if (clicked) {
    fill(255); 
    blendMode(DIFFERENCE);
  } else {
    fill(0);
    blendMode(NORMAL);
  }

 

  textSize(200);
  textFont(DegularText);
  textAlign(RIGHT, BOTTOM)
  text("Raum", width-20, height-280)
  text("der", width-20, height-120)
  text("Veränderung", width-20, height)

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
  document.getElementById("close").style.display =  "none"; 
  //document.getElementById("welcome").style.display =  "block"; 
  blendMode(NORMAL);
  loop();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
    
}