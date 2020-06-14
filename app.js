function maze(x,y){
    var totalCells = x*y
    var cells = []
    var unvisited = []
    for(var i = 0; i < y;i++){
        cells[i] = []
        unvisited[i] = []
        for(var j = 0; j < x; j++){
            cells[i][j] = [0,0,0,0]
            unvisited[i][j] = true
        }
    }
    
    var currentPos = [Math.floor(Math.random()*y), Math.floor(Math.random()*x)]
    var path = [currentPos]
    unvisited[currentPos[0]][currentPos[1]] = false
    var visited = 1
    while(visited<totalCells){
        var fourCells = [
            [currentPos[0],currentPos[1]+1,1,3],
            [currentPos[0]+1,currentPos[1],2,0],
            [currentPos[0],currentPos[1]-1,3,1],
            [currentPos[0]-1,currentPos[1],0,2],
        ]
        
        var potential = []
        for(let k = 0;k < 4;k++){
            if((fourCells[k][0] > -1 && fourCells[k][0] < y 
                && fourCells[k][1] > -1 && fourCells[k][1] < x 
                && unvisited[fourCells[k][0]][fourCells[k][1]])){
                   potential.push(fourCells[k])
               }
        }
        if(potential.length){
            nextPos = potential[Math.floor(Math.random()*potential.length)]
            cells[currentPos[0]][currentPos[1]][nextPos[2]] = 1
            cells[nextPos[0]][nextPos[1]][nextPos[3]] = 1
            unvisited[nextPos[0]][nextPos[1]] = false
            currentPos = [nextPos[0], nextPos[1]]
            visited++
            path.push(currentPos)
        }
        else{
            currentPos = path.pop()
        }
    }
    cells[0][0][3]=1
    cells[x-1][y-1][1]=1
    return cells
}
function playMove(cur,next){ 
    var fourDir = [[1,0],[0,-1],[-1,0],[0,1]]
    var nextPos = [(currPos[0]+fourDir[next][0]),(currPos[1]+fourDir[next][1])]
    if(disp[currPos[0]][currPos[1]][cur]==1&&
        disp[nextPos[0]][nextPos[1]][next]==1){
            ctx.fillStyle = 'green'
            ctx.fillRect(currPos[1]*scale+scale+ind,currPos[0]*scale+scale+ind,scale-2*ind,scale-2*ind)
            ctx.fillStyle = 'yellow'
            ctx.fillRect(nextPos[1]*scale+scale+ind,nextPos[0]*scale+scale+ind,
            scale-2*ind,scale-2*ind)
            currPos = [nextPos[0],nextPos[1]]
            if(currPos[1]==(n-1)&&currPos[0]==(m-1)){
                alert('you win')
            }
        }
}
function solveMaze(){ 
    
    var dir = [[1,3],[3,1],[0,2],[2,0]]
    var pot = []
    var fourDir = [[1,0],[0,-1],[-1,0],[0,1]]
    unvisited[currPos[0]][currPos[1]] = false
        for(var k = 0;k < dir.length;k++){
            if(disp[currPos[0]][currPos[1]][dir[k][0]]==1){
                var next = dir[k][1]
                var nextPos = [(currPos[0]+fourDir[next][0]),(currPos[1]+fourDir[next][1])]
                    if(nextPos[0]>=0&&nextPos[1]>=0&&nextPos[0]<n&&nextPos[1]<m
                        &&unvisited[nextPos[0]][nextPos[1]]){
                        pot.push(nextPos)
                    }
            }
        }
        if(pot.length){
            ctx.fillStyle = 'green'
            ctx.fillRect(currPos[1]*scale+scale+ind,currPos[0]*scale+scale+ind,scale-2*ind,scale-2*ind)
            
            var nextPos = pot[Math.floor(Math.random()*pot.length)]
            ctx.fillStyle = 'yellow'
            ctx.fillRect(nextPos[1]*scale+scale+ind,nextPos[0]*scale+scale+ind,
            scale-2*ind,scale-2*ind)
            unvisited[nextPos[0]][nextPos[1]] = false
            currPos = [nextPos[0], nextPos[1]]
            if(currPos[1]==(n-1)&&currPos[0]==(m-1)){
                alert('computer wins')
                clearInterval(setInterv)
            }
            //visited++
            path.push(currPos)
            //console.log(path)
        }
        else{
            ctx.fillStyle = 'green'
            ctx.fillRect(currPos[1]*scale+scale+ind,currPos[0]*scale+scale+ind,scale-2*ind,scale-2*ind)
            currPos = path.pop()
            ctx.fillStyle = 'yellow'
            ctx.fillRect(currPos[1]*scale+scale+ind,currPos[0]*scale+scale+ind,
            scale-2*ind,scale-2*ind)
            
        }
        
 }
 function solve(){
     if(currPos[0]!=(n-1)&&currPos[1]!=(m-1)){
        setInterv = setInterval(solveMaze,100)
        //console.log("worked")
     } 
 }
 function drawMaze(disp,color,term){
   // var disp = maze(m,n)
        for (var i = 0; i < disp.length; i++) {
            for (var j = 0; j < disp[i].length; j++) {
                var x = (i+1)*scale;
                var y = (j+1)*scale;
                ctx.beginPath();
                const drawBorder = function(dir){
                    switch(dir){
                        case(0):
                        //top
                            ctx.moveTo(x,y);
                            ctx.lineTo(x+scale,y);
                            break;
                        case(1):
                            //right
                            ctx.moveTo(x+scale,y);
                            ctx.lineTo(x+scale,y+scale);
                            break;
                        case(2):
                            //bottom
                            ctx.moveTo(x+scale,y+scale);
                            ctx.lineTo(x,y+scale);
                            break;
                        case(3):
                            //left
                            ctx.moveTo(x,y+scale);
                            ctx.lineTo(x,y);
                            break;
                    }
                    //ctx.fillText(i+","+j, x, y)
                    ctx.closePath(); //闭合路径
                    ctx.lineWidth = 1; //线的边框为10像素
                    ctx.strokeStyle = color;
                    ctx.stroke(); //绘制定义的图形
                }
                for(let k = 0;k<disp[j][i].length;k++){
                    if(disp[j][i][k]==0){
                        drawBorder(k)
                    }
                }
            }
        }
        
        if(term!=0){
            ctx.fillStyle = 'green'
            ctx.fillRect(ind+scale,ind+scale,scale-2*ind,scale-2*ind)
            ctx.fillStyle = 'red'
            ctx.fillRect(x+ind,y+ind,scale-2*ind,scale-2*ind)
        }
}
function refresh(){
    ctx.clearRect(0, 0, w, h)
    disp = maze(m,n)
    drawMaze(disp,'black',1)
}

