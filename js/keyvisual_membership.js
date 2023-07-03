//FONT
let font;
function preload() {
    DegularDisplay = loadFont("fonts/DegularDisplay-Regular.otf");
    DegularDisplaySemiB = loadFont("fonts/DegularDisplay-Semibold.otf");
}

const { Engine, World, Bodies, Composite, Mouse, MouseConstraint } = Matter;

let circles = [];
let myboundary = [];

let gridWidth, gridHeight;
let segments = 9;
let segmentSizeX;
let segmentSizeY;

let engine;
let world;
let canvasmouse;
let mConstraint;

//POINTS
let pointX = [];
let pointY = [];

const point = [];

function setup() {

    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    canvas.style('display', 'block');
    frameRate(60);

    engine = Engine.create();
    world = engine.world;    

    gridMarginX = 20; 
    gridMarginTop = 80;
    gridMarginBottom = 20;
    segmentSizeX = (windowWidth-10-gridMarginX)/segments;
    segmentSizeY = (windowHeight-gridMarginTop-gridMarginBottom)/segments;

    gridWidth = floor((width-gridMarginX) / segmentSizeX) +1; //8
    gridHeight = floor((height-gridMarginTop-gridMarginBottom) / segmentSizeX); //4

    pointX = JSON.parse(sessionStorage.getItem("pointX"));
    pointY = JSON.parse(sessionStorage.getItem("pointY"));

    if (pointX == null && pointY == null) {

      // INITIAL POINTS FOR SHAPE
      pointX = [null, ...Array(8)];
      pointY = [null, ...Array(8)];
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

      pointX[6] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeX;
      pointY[6] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY;

      pointX[7] = floor(random(gridWidth/segments*3)) * segmentSizeX;
      pointY[7] = floor(random(gridWidth/segments*6, gridWidth)) * segmentSizeY;
      pointX[8] = floor(random(gridWidth/segments*3)) * segmentSizeX;
      pointY[8] = floor(random(gridWidth/segments*3, gridWidth/segments*6)) * segmentSizeY;

      point[1] = createVector(pointX[1], pointY[1]);
      point[2] = createVector(pointX[2], pointY[2]);
      point[3] = createVector(pointX[3], pointY[3]);
      point[4] = createVector(pointX[4], pointY[4]);
      point[5] = createVector(pointX[5], pointY[5]);
      point[6] = createVector(pointX[6], pointY[6]);
      point[7] = createVector(pointX[7], pointY[7]);
      point[8] = createVector(pointX[8], pointY[8]);
    }

    for (i = 1; i < 9; i++) {
      point[i] = { x: pointX[i], y: pointY[i] };
    }
  
    myboundary[1] = new Boundary(point[1], point[2]);
    myboundary[2] = new Boundary(point[2], point[3]);
    myboundary[3] = new Boundary(point[3], point[4]);
    myboundary[4] = new Boundary(point[4], point[5]);
    myboundary[5] = new Boundary(point[5], point[6]);
    myboundary[6] = new Boundary(point[6], point[7]);
    myboundary[7] = new Boundary(point[7], point[8]);
    myboundary[8] = new Boundary(point[8], point[1]);

    //POINTS FOR FRAME

    point[9] = createVector(0, 0);
    point[10] = createVector(width, 0);
    point[11] = createVector(width, height);
    point[12] = createVector(0, height);

    myboundary[9] = new Boundary(point[9] , point[10]);
    myboundary[10] = new Boundary(point[10] , point[11]);
    myboundary[11] = new Boundary(point[11] , point[12]);
    myboundary[12] = new Boundary(point[12] , point[9]);

    for (i = 1; i < 12; i++) {
      World.add(world, myboundary[i]);
    }    

    explosion();

    let mConstraint;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {

    let canvasMouse = Mouse.create(canvas.elt);
    let options = {
        mouse: canvasMouse,
    }

    
    canvasMouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    mConstraint.mouse.element.removeEventListener("mousewheel", mConstraint.mouse.mousewheel);
    mConstraint.mouse.element.removeEventListener("DOMMouseScroll", mConstraint.mouse.mousewheel);
    }

    if (mConstraint) {
      World.add(world, [mConstraint]);
    }
    
}


function draw() {   
    background(255);   
    noStroke();
    fill("#A4FFA3");

    beginShape();
      for(i = 1; i < 9; i++) {
        vertex(pointX[i], pointY[i]);
      }
    endShape(CLOSE);
   
    for (let i = 0; i < circles.length; i++) {
        circles[i].show();
    }    
   
    Engine.update(engine);
}

let smileySize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--smileySize'), 10);


function explosion() {

  const circleOptions = {
    render: {
      sprite: {
          texture: "/Users/danielavogel/Documents/GitHubRepositories/DFC_Website_Keyvisual/img/FACE.png",
          xScale: 1,
          yScale: 1,
      }
    }
  };  
  
 

  for (let i = 0; i < 80; i++) {
    const x = Math.random() * ((pointX[3]-100) - (pointX[1]+100)) + pointX[1];
    const y = Math.random() * (pointY[4] - pointY[1]) + pointY[1];
    circles.push(new Circle(x, y, smileySize, circleOptions)); 
  }

  
}
