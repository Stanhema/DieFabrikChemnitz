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

  
    canvas = createCanvas(windowWidth-10, windowHeight);
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

    myboundary[8] = new Boundary(mouseX, mouseY);

    for (i = 1; i < 8; i++) {
      World.add(world, myboundary[i]);
    }    

    explosion();

    let canvasMouse = Mouse.create(canvas.elt);
    let options = {
        mouse: canvasMouse,
    }

    canvasMouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
   

    mConstraint.mouse.element.removeEventListener("mousewheel", mConstraint.mouse.mousewheel);
    mConstraint.mouse.element.removeEventListener("DOMMouseScroll", mConstraint.mouse.mousewheel);

    World.add(world, mConstraint)
    
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
   
    //Draw the circles
    for (let i = 0; i < circles.length; i++) {
        circles[i].show();
    }    

    Engine.update(engine);
  
}


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

  for (let i = 0; i < 70; i++) {
    const x = Math.random() * ((pointX[3]-100) - (pointX[1]+100)) + pointX[1];
    const y = Math.random() * (pointY[4] - pointY[1]) + pointY[1];
    circles.push(new Circle(x, y, 40, circleOptions)); 
  }
}

