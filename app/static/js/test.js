console.log("hello")
var canvas = document.getElementById("canvas");
canvas.width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
canvas.height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
var ctx = canvas.getContext("2d");
for (var i = 0; i < 123321; i++) {
    ctx.fillRect(10,i*10,10,10);
}
function coordinate(event) {
var rect = canvas.getBoundingClientRect();
let x = event.clientX - rect.left;
let y = event.clientY - rect.top;
document.getElementById("X").value = x;
document.getElementById("Y").value = y;
ctx.fillRect(x,y,10,10);
    }
coordinate(event);

var dog = {
name: 'cordf',
legs: 5,
isAwesome: false
}
console.log(dog.name);