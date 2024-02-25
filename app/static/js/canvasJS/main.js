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
import Button from "./button.js";

var canvas = document.getElementById("gamefield");
var ctx = canvas.getContext("2d");
var button_list = []

visualViewport.onresize = () => {
    canvas.width = window.innerWidth - 5
    canvas.height = window.innerHeight - 5
}

function canvasSizeSetter() {
    canvas.width = 700
    canvas.height = 700
}

function Button_func(event) {
    let b_x = 40
    let b_y = 40
    let b_w = 40
    let b_h = 40
    let x = event.clientX;
    let y = event.clientY;

    ctx.fillStyle = "rgb(180, 180, 180)";
    ctx.fillRect(b_x,b_y,b_w,b_h);
    console.log(x, y)
    if (x >= b_x & x <= b_x+b_w & y >= b_y & y <= b_x+b_h) {
    ctx.fillStyle = "rgb(123, 10, 50)";
    ctx.fillRect(b_x,b_y,b_w,b_h);
    }
}

//my_bytton.draw(ctx)



function fieldMaker(startx, starty, width, height, amount) {
    let x = 0
    let y = 0
    for (let i = 0; i <= amount*amount; i++) {
        button_list.push(new Button(startx+x, starty+y, width, height, ctx))
        x += 50
        if (Number.isInteger(i/10)) {
            y += 50
            x = 0
        }
    }
}



function fieldDrawer() {
    for (let i = 0; i < button_list.length; i++) {
        button_list[i].draw(ctx)
        console.log(button_list.length)
    }
}


function clickCheker(event) {
    let x = event.clientX;
    let y = event.clientY;
    for (let i = 0; i <= button_list.length; i++) {
        button_list[i].clickChecker(x, y)
    }
}

canvas.addEventListener("mousedown", function(event) {
clickCheker(event);
});

fieldMaker(0,0,40,40,10)
console.log(button_list[0])
fieldDrawer()
canvasSizeSetter()