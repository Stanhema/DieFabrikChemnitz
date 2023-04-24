let font;

function preload() {
    DegularDisplay = loadFont("fonts/DegularDisplay-Regular.otf");
    DegularText = loadFont("fonts/DegularText-Medium.otf");
}

let point1X = 100;
let point1Y = 100
let interval = 2;
let randomizerr;

let shapeColor = "white";
let myEllipseSize = 15;

function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
  function draw() {

    background(255);
    stroke("black");

    if(frameCount % (interval * 30) == 0){
        randomizerr = int(random(-2,2));
    }
    console.log(randomizerr)

    if (mouseIsPressed) {
      fill(0);
    } else {
      fill(255);
    }
    
    mySpeed = 0.01;
    offset = map(sin(mySpeed*frameCount*randomizerr), -1 , 1, 10, 100);

    let number = noise(10);

    stepW = windowWidth/10;
    stepH = windowHeight/10;

    
console.log(number)
let x = windowWidth/2;
let y = windowHeight/2;
a = 10
b = 20
t =frameCount/1000; 
x += map(noise(a, t), 0.0, 1.0, -1.0*stepW, 1.0*stepW);
y += map(noise(b, t), 0.0, 1.0, -1.0*stepH, 1.0*stepH);

    beginShape(TESS);
        vertex(mouseX, mouseY);
        vertex(x, y);
        vertex(point1X, point1Y);
        vertex(windowWidth/2, 0);
        vertex(windowWidth-400, 60);
        vertex(windowWidth-400, windowHeight/2);
        vertex(windowWidth-400, windowHeight/2);
        vertex(windowWidth/3, windowHeight/2);
        vertex(windowWidth/2, windowHeight-100);
    endShape(CLOSE);

    fill("black");
    
    textFont(DegularText);
    textSize(35);

    ellipse(mouseX, mouseY, myEllipseSize)
    text("Become a member", mouseX+10, mouseY+10);

    ellipse(point1X, point1Y, myEllipseSize)
    text("Tim just joined", point1X+10, point1Y+10);

    //helper Raster
    stroke("red");

    for (let j = 0; j < 10; j = j+1) {
        line(0, windowHeight/10*j, windowWidth, windowHeight/10*j);   
    }

    for (let i = 0; i < 10; i = i+1) {
        line(windowWidth/10*i, 0, windowWidth/10*i, windowHeight);
    }
   
  }

  function mouseClicked() {
    shapeColor = "black";
}