class Button {
    constructor(pos_x, pos_y, width, height, ctx) {
    this.position_x = pos_x
    this.position_y = pos_y
    this.width = width
    this.height = height
    this.ctx = ctx
    }

    draw() {
    this.ctx.fillStyle = "rgb(180, 180, 180)";
    this.ctx.fillRect(this.position_x,this.position_y,this.width,this.height);
    }

    click_cheker(x, y) {
        if (x >= this.position_x & x <= this.position_x+this.width & y >= this.position_y & y <= this.position_y+this.width) {
        ctx.fillStyle = "rgb(123, 10, 50)";
        ctx.fillRect(this.position_x,this.position_y,this.width,this.height);
        return true
        }
        return false
    }
}

function mouseLeftButtonDown(event) {
    let x = event.clientX;
    let y = event.clientY;
    my_bytton.click_cheker(x, y)
}

//setInterval(myFunction, 1000);










console.log("hello1233")
var canvas = document.getElementById("gamefield");
var ctx = canvas.getContext("2d");

//var my_bytton = new Button(40, 40, 40, 40, ctx)


canvasSizeSetter()
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

var button_list = []

function fieldMaker(startx, starty, amount) {
    x = 0
    y = 0
    for (let i = 0; i <= amount*amount; i++) {
        button_list.push(new Button(40+x, 40+y, 40, 40, ctx))
        x += 60
        if (Number.isInteger(i/10)) {
            y += 60
            x = 0
        }
    }
}

fieldMaker(0,0,10)
console.log(button_list[0])

function fieldDrawer() {
    for (let i = 0; i < button_list.length; i++) {
        button_list[i].draw(ctx)
        console.log(button_list.length)
    }
}

fieldDrawer()

function clickCheker(event) {
    let x = event.clientX;
    let y = event.clientY;
    for (let i = 0; i <= button_list.length; i++) {
        button_list[i].click_cheker(x, y)
    }
}