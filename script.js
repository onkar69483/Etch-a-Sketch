
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
          
        `
    for (let index = 1; index <=gridSize*gridSize; index++) {
        grid.innerHTML += "<div class='pixel'></div>"
    }
    document.querySelectorAll('.pixel').forEach((el) => {
        el.setAttribute('style',cssRules)
        el.classList.add("toggleGrid")  
    })
}

function handleDrawing(color){
    function draw(){
        var cssRules = ``
        if(color === 'rainbow'){
            cssRules = `background-color: ${getRandomColor()};`
        }
        else {
            cssRules = `background-color: ${color};`
        }
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
        `
        document.querySelectorAll('.pixel').forEach((el) => {
            el.setAttribute('style',cssRules)  
        })
    })
}

function toggleGrid(){
    document.querySelectorAll('.pixel').forEach((el) => {
        el.classList.toggle("toggleGrid") 
    })
}


document.querySelector(".gridsize").addEventListener('click', function(){
    var size = document.getElementById("gridsize").value;
    if (size === '') size = 16
    makeGrid(size)
  });
 
document.querySelector(".gridStatus").addEventListener("click", function(){
    toggleGrid()
})

document.querySelector(".eraser").addEventListener("click", function(){
    handleDrawing('white')
})

document.querySelector(".pencil").addEventListener("click", function(){
    handleDrawing('black')
})

document.querySelector(".rainbow").addEventListener("click", function(){
    handleDrawing('rainbow')
})

document.querySelector("#favcolor").addEventListener("input", function(event){
    handleDrawing(event.target.value)
})

function getRandomColor() {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256); 
    return `rgb(${r}, ${g}, ${b})`;
}

makeGrid(16)
handleDrawing('black')
clear()