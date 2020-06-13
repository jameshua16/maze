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
//maze(10,10)

// function solvemaze2(){
//     var totalCells = m*n
//     //var cells = []
//     //disp
//     var unvisited = []
//     for(var i = 0; i < n;i++){
//         //cells[i] = []
//         unvisited[i] = []
//         for(var j = 0; j < m; j++){
//            // cells[i][j] = [0,0,0,0]
//             unvisited[i][j] = true
//         }
//     }
    
//     var currentPos = [Math.floor(Math.random()*y), Math.floor(Math.random()*x)]
//     var path = [currentPos]
//     unvisited[currentPos[0]][currentPos[1]] = false
//     var visited = 1
//     while(visited<totalCells){
//         var fourCells = [
//             [currentPos[0],currentPos[1]+1,1,3],
//             [currentPos[0]+1,currentPos[1],2,0],
//             [currentPos[0],currentPos[1]-1,3,1],
//             [currentPos[0]-1,currentPos[1],0,2],
//         ]
        
//         var potential = []
//         for(let k = 0;k < 4;k++){
//             if((fourCells[k][0] > -1 && fourCells[k][0] < y 
//                 && fourCells[k][1] > -1 && fourCells[k][1] < x 
//                 && unvisited[fourCells[k][0]][fourCells[k][1]])){
//                    potential.push(fourCells[k])
//                }
//         }
//         if(potential.length){
//             ctx.fillStyle = 'green'
//             ctx.fillRect(currPos[1]*scale+scale+5,currPos[0]*scale+scale+5,scale-10,scale-10)
//             nextPos = potential[Math.floor(Math.random()*potential.length)]
//             ctx.fillStyle = 'yellow'
//             ctx.fillRect(nextPos[1]*scale+scale+5,nextPos[0]*scale+scale+5,scale-10,scale-10)
            
//             // disp[currentPos[0]][currentPos[1]][nextPos[2]] = 1
//             // disp[nextPos[0]][nextPos[1]][nextPos[3]] = 1
//             unvisited[nextPos[0]][nextPos[1]] = false
//             currentPos = [nextPos[0], nextPos[1]]
//             visited++
//             path.push(currentPos)
//         }
//         else{
//             currentPos = path.pop()
//         }
//     }
    
//     return disp
// }
