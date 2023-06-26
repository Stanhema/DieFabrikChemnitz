//FONT
let font;
function preload() {
    DegularDisplay = loadFont("fonts/DegularDisplay-Regular.otf");
    DegularDisplaySemiB = loadFont("fonts/DegularDisplay-Semibold.otf");
}

const { Engine, World, Bodies, Composite } = Matter;

let engine;
let world;

let circles = [];
let myboundary = [];

let gridWidth, gridHeight;
let segments = 9;
let segmentSizeX;
let segmentSizeY;

//POINTS
let pointX = [];
let pointY = [];

function setup() {
    canvas = createCanvas(windowWidth-10, windowHeight);
    canvas.parent('canvas-container');
    canvas.style('display', 'block');
  frameRate(60);
    // create an engine
    engine = Engine.create();
    world = engine.world;    

    gridMarginX = 20; 
    gridMarginTop = 80;
    gridMarginBottom = 20;
    segmentSizeX = (windowWidth-10-gridMarginX)/segments;
    segmentSizeY = (windowHeight-gridMarginTop-gridMarginBottom)/segments;

    gridWidth = floor((width-gridMarginX) / segmentSizeX) +1; //8
    gridHeight = floor((height-gridMarginTop-gridMarginBottom) / segmentSizeX); //4

    //INITIAL POINTS FOR SHAPE, TODO: Get last coordinates from keyvisual.js
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

    pointX[6] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeX + gridMarginX/2;
    pointY[6] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY;

    pointX[7] = floor(random(gridWidth/segments*3)) * segmentSizeX;
    pointY[7] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY;

    pointX[8] = floor(random(gridWidth/segments*3)) * segmentSizeX;
    pointY[8] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY;

    const point1 = { x: pointX[1], y: pointY[1] };
    const point2 = { x: pointX[2], y: pointY[2] };
    const point3 = { x: pointX[3], y: pointY[3] };
    const point4 = { x: pointX[4], y: pointY[4] };
    const point5 = { x: pointX[5], y: pointY[5] };
    const point6 = { x: pointX[6], y: pointY[6] };
    const point7 = { x: pointX[7], y: pointY[7] };
    const point8 = { x: pointX[8], y: pointY[8] };
    
    myboundary[1] = new Boundary(point1, point2);
    myboundary[2] = new Boundary(point2, point3);
    myboundary[3] = new Boundary(point3, point4);
    myboundary[4] = new Boundary(point4, point5);
    myboundary[5] = new Boundary(point5, point6);
    myboundary[6] = new Boundary(point6, point7);
    myboundary[7] = new Boundary(point7, point8);
    myboundary[8] = new Boundary(point8, point1);

    for (i = 1; i < 8; i++) {
      World.add(world, myboundary[i]);
    }

    
}


    
function mouseDragged() {

    const circleOptions = {
      render: {
        sprite: {
            texture: "/Users/danielavogel/Documents/GitHubRepositories/DFC_Website_Keyvisual/img/FACE.png",
            xScale: 1,
            yScale: 1,
        }
      }
    };  

    circles.push(new Circle(mouseX, mouseY, 40, circleOptions));
}

function draw() {   
    background(255);

    noStroke();
    fill("#A4FFA3");

    beginShape();
      vertex(pointX[1], pointY[1]);
      vertex(pointX[2], pointY[2]);
      vertex(pointX[3], pointY[3]);
      vertex(pointX[4], pointY[4]);
      vertex(pointX[5], pointY[5]);
      vertex(pointX[6], pointY[6]);
      vertex(pointX[7], pointY[7]);
      vertex(pointX[8], pointY[8]);
    endShape(CLOSE);
   
    //Draw the circles
    for (let i = 0; i < circles.length; i++) {
        circles[i].show();
    }    

    Engine.update(engine);
  
}