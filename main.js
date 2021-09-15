let w;
let h;
let gridSize = 25;
let grid;

let start;
let end;
let clickStatus = 0;
let algoSelected;
let isStarted;

let openSet;
let closedSet;
let path;
let current;


function setup() {
    let myCanvas = createCanvas(windowWidth - (windowWidth * 0.02), windowHeight - 80);
    // background(242,254,255);
    myCanvas.parent("maincanvas");
    myCanvas.position((windowWidth - width)/2,75);
    stroke(184, 254, 255);
    w = floor(width/gridSize);
    h = floor(height/gridSize);
    algoSelected = '';
    isStarted = null;
    openSet = [];
    closedSet = [];
    path = [];
    current = undefined;
    grid = new Array(w);
    for(let j=0;j<w;++j) {
        grid[j] = new Array(h);
    }

    for(let i=0;i<w;++i) {
        for(let j=0;j<h;++j) {
            grid[i][j] = new Node(i,j,gridSize);
        }
    }
    for(let i=0;i<w;++i) {
        for(let j=0;j<h;++j) {
            grid[i][j].allocateNeighbour(grid);
            grid[i][j].drawGrid(color(242,254,255));
        }
    }

    start = grid[10][9];
    start.drawGrid(color(0,255,0));
    end = grid[35][14];
    end.drawGrid(color(255,0,0));
    noLoop();
}

function chooseAlgorithm(algo) {
    openSet = [];
    algoSelected = algo;
    if(isStarted != null) {
        return;
    }
    if(algoSelected == 'astar') {
        openSet.push(start);
    } else if(algoSelected == 'djik') {
        for(let i=0;i<w;++i) {
            for(let j=0;j<h;++j) {
                if(grid[i][j] == start) {
                    grid[i][j].d = 0;
                }
                openSet.push(grid[i][j]);
            }
        }
    } else if(algoSelected == 'dfs' || algoSelected == 'bfs'){
        start.visited = true;
        openSet.push(start);
    }
}

function startSolving() {
    if(algoSelected == null) {
        
    } else {
        isStarted = true;
        loop();
    }
}
function draw() {
    if (isStarted) {
        if(algoSelected == 'astar') {
            isStarted = (AStar(grid,start,end) == 0)?true:false;
        } else if(algoSelected == 'djik') {
            isStarted = (Djikstra(grid,end) == 0)?true:false;
        } else if(algoSelected == 'dfs') {
            isStarted = (DFS(grid,end) == 0)?true:false;
        } else if(algoSelected == 'bfs') {
            isStarted = (BFS(grid,end) == 0)?true:false;
        }
        drawOpenAndClosedSet();
    } else if(isStarted == false){
        DrawPath();
        noLoop();
    }
}

function createObstacle() {
    if(isStarted == null) {
        for(let i=0;i<w;++i) {
            for(let j=0;j< h; ++j) {
                if(grid[i][j] == start || grid[i][j] == end) {
                    continue;
                }
                grid[i][j].setWall();
                grid[i][j].drawGrid(color(242,254,255));
            }
        }
    }
}

function findNodePosition(x ,y) {

    if(x > 0 && x < width  && y > 0 && y < height) {
        return [floor(x/gridSize),floor(y/gridSize)];
    }
    
    return [];
    
}

function drawOpenAndClosedSet() {
    for(let i=0;i<openSet.length; ++i) {
        openSet[i].drawGrid(color(81, 151, 212));
    }
    for(let i=1;i<closedSet.length; ++i) {
        closedSet[i].drawGrid(color(148, 3, 252));
    }
    start.drawGrid(color(0,255,0));
    end.drawGrid(color(255,0,0));
}

function DrawPath() {
    if(current != undefined) {
        var temp = current;
		path.push(temp);
		while (temp.parent) {
		path.push(temp.parent);
		temp = temp.parent;
		}

        for (var i = path.length-2; i > 0; --i) {
            path[i].drawGrid(color(255, 149, 0));
        }

    }
    start.drawGrid(color(0,255,0));
    end.drawGrid(color(255,0,0));
}