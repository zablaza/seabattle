console.log("hello")
var canvas = document.getElementById("gamefield");
var ctx = canvas.getContext("2d");
canvasSizeSetter()
visualViewport.onresize = () => {
    if (window.innerWidth > 1 & window.innerWidth <= 1366) {
    canvas.width = 200
    canvas.height = 200
    } else if (window.innerWidth > 1366 & window.innerWidth <= 1600) {
    canvas.width = 400
    canvas.height = 400
    } else if (window.innerWidth > 1600 & window.innerWidth <= 1920) {
    canvas.width = 500
    canvas.height = 500
    } else if (window.innerWidth > 1920 & window.innerWidth <= 2560) {
    canvas.width = 600;
    canvas.height = 600;
    }
    console.log(window.innerWidth)
};


//function canvasFitToContainer() {
//    canvas.style.width = gameFieldContainer.width;
//    canvas.style.height= gameFieldContainer.width;
//    canvasScaleSetter();
//}

function canvasSizeSetter() {
    if (window.innerWidth > 1600 & window.innerWidth <= 1920) {
    canvas.width = 400
    canvas.height = 400
    }
    if (window.innerWidth > 1920 & window.innerWidth <= 2560) {
    canvas.width = 600;
    canvas.height = 600;
    }
    console.log(window.innerWidth)
}

function coordinate(event) {
    var rect = canvas.getBoundingClientRect();

    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    document.getElementById("X").value = x;
    document.getElementById("Y").value = y;
    ctx.fillRect(x,y,10,10);
}

function sizeRowChanger(event) {
    rowCanvas.width = 300
}