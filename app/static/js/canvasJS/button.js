

export default class Button {
    constructor(pos_x, pos_y, width, height, ctx, ind) {
    this.position_x = pos_x;
    this.position_y = pos_y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.is_clicked = false
    this.ind = ind
    }

    draw() {
    if (this.is_clicked == false) {
        this.ctx.fillStyle = "rgb(180, 180, 180)";
        }
    if (this.is_clicked == true) {
        this.ctx.fillStyle = "rgb(123, 10, 50)";
    }
    this.ctx.fillRect(this.position_x,this.position_y,this.width,this.height);
    }

    click(x, y) {
        if (x >= this.position_x & x <= this.position_x+this.width & y >= this.position_y & y <= this.position_y+this.width) {
        this.ctx.fillStyle = "rgb(123, 10, 50)";
        this.ctx.fillRect(this.position_x,this.position_y,this.width,this.height);
        this.is_clicked = true
        return true
        }
        return false
    }
}