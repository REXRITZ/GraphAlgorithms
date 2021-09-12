class Node {
    constructor(i, j, gridSize) {

        this.i = i;
        this.j = j;
        this.gridSize = gridSize;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbour = [];
        this.parent = undefined;
        this.isWall = false;
        this.d = Infinity;
    }

    setWall() {
        if(floor(random(10)) < 2) {
            this.isWall = true;
        }
    }

    allocateNeighbour(grid) {
        
        var i = this.i;
        var j = this.j;
        var row = grid.length;
        var col = grid[0].length;

        if(i > 0) {
            this.neighbour.push(grid[i-1][j]);
        }
        if(i < row-1) {
            this.neighbour.push(grid[i+1][j]);
        }
        if(j > 0) {
            this.neighbour.push(grid[i][j-1]);
        }
        if(j < col-1) {
            this.neighbour.push(grid[i][j+1]);
        }

    }

    drawGrid(col) {
        if(this.isWall) {
            fill(0);
        } else if(col) {
            fill(col);
        }
        rect(this.i*this.gridSize,this.j*this.gridSize,this.gridSize,this.gridSize,5);
    }


}