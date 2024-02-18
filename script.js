
var grid = document.querySelector(".grid")

function makeGrid(grid_size){ 
    const cssRules = `
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(${grid_size}, auto);
        grid-template-rows: repeat(${grid_size}, auto);
        height: 400px;
        width: 400px;
        background-color: #B7C9F2;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        `
    grid.setAttribute('style', cssRules);
    makePixels(grid_size)
}

function makePixels(gridSize){
    grid.innerHTML = null
    const cssRules = `
        background-color: white;
        border: 0.1px solid black;    
        `
    for (let index = 1; index <=gridSize*gridSize; index++) {
        grid.innerHTML += "<div class='pixel'></div>"
    }
    document.querySelectorAll('.pixel').forEach((el) => {
        el.setAttribute('style',cssRules)  
    })
}

function handleDrawing(){
    function draw(){
        const cssRules = `background-color: black;`
        this.setAttribute('style',cssRules)
    }
    function stopDrawing(){
        document.querySelectorAll('.pixel').forEach((el) => {
            el.removeEventListener('mouseover', draw)
        })
    }
    grid.addEventListener("mousedown", function(event) {
        draw.call(event.target)
        document.querySelectorAll('.pixel').forEach((el) => {
            el.addEventListener('mouseover', draw)
        })
        grid.addEventListener("mouseup", function(event){
            stopDrawing.call(event.target)
        })
    })
}

function clear(){
    document.querySelector(".clear").addEventListener("click", function(){
        const cssRules = `background-color: white;
        border: 0.1px solid black;`
        document.querySelectorAll('.pixel').forEach((el) => {
            el.setAttribute('style',cssRules)  
        })
    })
}

document.querySelector(".gridsize").addEventListener('click', function(){
    var size = document.getElementById("gridsize").value;
    if (size === '') size = 16
    makeGrid(size)
  });

makeGrid(16)
handleDrawing()
clear()


