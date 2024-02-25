
export default class Button {
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

    clickChecker(x, y) {
        if (x >= this.position_x & x <= this.position_x+this.width & y >= this.position_y & y <= this.position_y+this.width) {
        this.ctx.fillStyle = "rgb(123, 10, 50)";
        this.ctx.fillRect(this.position_x,this.position_y,this.width,this.height);
        return true
        }
        return false
    }
}