

export default class Button {
    constructor(pos_x, pos_y, width, height, ctx, ind) {
    this.position_x = pos_x;
    this.position_y = pos_y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.is_clicked = false
    this.ind = ind
    this.ishovered = false
    this.type = "default"
    this.value = ""
    this.is_active = true
    }

    draw() {
    if (this.type != "empty") {
    if (this.is_clicked == false) {
        this.ctx.fillStyle = "rgb(180, 180, 180)";
        }
    else if (this.is_clicked == true) {
        this.ctx.fillStyle = "rgb(123, 10, 50)";
    }
    if (this.ishovered == true) {
        this.ctx.fillStyle = "rgb(0, 256, 0)";
        console.log(this.value)
    }
    this.ctx.strokeStyle = "rgb(256, 0, 0)"
    this.ctx.font = "20px Impact";
    this.ctx.fillRect(this.position_x,this.position_y,this.width,this.height);
    if (this.value != "") {
    this.ctx.strokeText(this.value, this.position_x+20, this.position_y+20, 100)
    }
    }
    }

    click(x, y) {
        if (this.type != "empty" & this.is_active == true) {
            if (x >= this.position_x & x <= this.position_x+this.width & y >= this.position_y & y <= this.position_y+this.width) {
                this.ctx.fillStyle = "rgb(123, 10, 50)";
                this.ctx.fillRect(this.position_x,this.position_y,this.width,this.height);
                //this.is_clicked = true
                return true
            }
        }
        return false
    }

    hover(x, y) {
        if (this.is_active == true) {
        if (x >= this.position_x & x <= this.position_x+this.width & y >= this.position_y & y <= this.position_y+this.width) {
        this.ishovered = true
        return true
        } else {
            this.ishovered = false
            return false
        }
        }
    }
}