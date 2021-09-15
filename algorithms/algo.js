

function AStar(grid,start,end) {

    if (openSet.length > 0) {
        
        var index = getIndex();
        current = openSet[index];

        if(getDistance(current,end) == 0)  {
            //goal reached
            //do something
            console.log('hooray!!');
            return 1;
        }
        openSet.splice(index,1);
        current.visited = true;
        closedSet.push(current);

        for (let i=0; i<current.neighbour.length; ++i) {
            var neighbour = current.neighbour[i];
            
            if(!neighbour.visited && !neighbour.isWall) {
                tentative_gScore = current.g + getDistance(current,neighbour);
            
                var isNew = false;
                if(openSet.includes(neighbour)) {
                    if(tentative_gScore < neighbour.g) {
                        neighbour.h = tentative_gScore;
                        isNew = true;
                    }
                } else {
                    neighbour.g = tentative_gScore;
                    isNew = true;
                    openSet.push(neighbour);
                }

                if(isNew) {
                    neighbour.h = getDistance(neighbour, end);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.parent = current;
                }
            }
        }
        return 0;
    }
    return 1;
}

function Djikstra(grid,end) {

    let val,index;
    if(openSet.length > 0) {
        val = findNodeWithMinDistance();
        index = val[1];
        current = val[0];
        if(current.d == Infinity) {
            console.log('no solution');
            return 1;
        }

        openSet.splice(index,1);
        current.visited = true;
        closedSet.push(current);

        if(current == end) {
            console.log('hooray');
            return 1;
        }

        for(let i=0;i<current.neighbour.length; ++i) {
            let neighbour = current.neighbour[i];
            if(!neighbour.visited && !neighbour.isWall) {
                let dScore = current.d + getDistance(neighbour,current);
                if(dScore < neighbour.d) {
                    neighbour.d = dScore;
                    neighbour.parent = current;
                }
            }
        }
        return 0;
    }
    return 1;
}

function DFS(grid,end) {

    if(openSet.length > 0) {
        current = openSet[openSet.length-1];
        openSet.splice(openSet.length-1,1);

        if(current == end) {
            console.log('hooray!');
            return 1;
        }
        
        for(let i=0; i< current.neighbour.length; ++i) {
            let neighbour = current.neighbour[i];
            if(!neighbour.visited && !neighbour.isWall) {
                openSet.push(neighbour);
                closedSet.push(current);
                neighbour.visited = true;
                neighbour.parent = current;
            }
        }
        return 0;
    }
    return 1;
}

function BFS(grid,end) {

    if(openSet.length > 0) {
        current = openSet[0];
        openSet.splice(0,1);

        if(current == end) {
            console.log('hooray!');
            return 1;
        }
        for(let i=0; i< current.neighbour.length; ++i) {
            let neighbour = current.neighbour[i];
            if(!neighbour.visited && !neighbour.isWall) {
                openSet.push(neighbour);
                closedSet.push(current);
                neighbour.parent = current;
                neighbour.visited = true;
            }
        }
        return 0;
    }
    return 1;
}


function getIndex() {

    let index = 0;
    for(let ind=0; ind < openSet.length; ++ind) {
        if(openSet[ind].f < openSet[index].f) {
            index = ind;
        }
    }
    
    return index;
}

function findNodeWithMinDistance() {
    let minNode = openSet[0];
    let index = 0;
    // console.log(minNode)
    for(let i=1;i<openSet.length; ++i) {
        if(minNode.d > openSet[i].d) {
            minNode = openSet[i];
            index = i;
        }
    }
    return [minNode,index];
}

function getDistance(a,b) {

    return dist(a.i, a.j, b.i, b.j);
}
