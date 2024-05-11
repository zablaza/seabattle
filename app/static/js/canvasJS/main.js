/*
js module file structure
    -1- import statements
    -2- global variables
    -3- local module variables (let)
    -4- local file variables (let)
    -5- export classes, functions
    -6- classes, functions
    -7- calls
*/
//import playerGameField from "./gamefield.js";
import gameField from "./gamefield.js";

var canvas = document.getElementById("gamefield");
var ctx = canvas.getContext("2d");

var mainField = new gameField(canvas, ctx)



function canvasSizeSetter() {
    canvas.width = 1200
    canvas.height = 1200
}
document.addEventListener('DOMContentLoaded', function(){
    mainField.fieldInit()
    });

visualViewport.onresize = () => {
    canvas.width = window.innerWidth - 5
    canvas.height = window.innerHeight - 5
    mainField.draw()

    }

canvas.addEventListener("mousedown", function(event) {
    mainField.onLeftMouseButtonDown(event)
    mainField.draw()
    });

canvas.addEventListener("mousemove", function(event) {
    mainField.onMouseHover(event)
    mainField.draw()
    });

window.addEventListener("keydown", function(event) {
    if (event.keyCode === 82){
        mainField.aligmentChanger()
    }
})


canvasSizeSetter()






