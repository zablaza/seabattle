import BaseButton from "./base.js";

export class Button extends BaseButton{
    constructor(pos_x, pos_y, width, height, ctx, ind) {
    super(pos_x, pos_y, width, height, ctx);
//    this.position_x = pos_x;
//    this.position_y = pos_y;
//    this.width = width;
//    this.height = height;
//    this.ctx = ctx;
//    this.is_clicked = false
//    this.ishovered = false
//    this.is_active = true
    this.ind = ind;
    this.is_hit = false
    this.type = "default";
    this.value = "";
    this.maxWidthPixels = 100; // stroke in pixels

    this.color = "rgb(180, 180, 180)";
    this.clicked_color = "rgb(123, 10, 50)";
    this.hovered_color = "rgb(0, 256, 0)";
    this.stroke_style = "rgb(256, 0, 0)";
    this.shrift = "20px Impact";

    }

    draw() {
    if (this.type != "empty") {
        let color = this.color;
        if (this.is_clicked == false) {
            color = this.color;
        } else if (this.is_clicked == true) {
            color = this.clicked_color;
        }
        if (this.ishovered == true) {
            color = this.hovered_color;
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.position_x,this.position_y,this.width,this.height);

        this.ctx.strokeStyle = this.stroke_style;
        this.ctx.font = this.shrift;

        if (this.value != "") {
            var metrics = this.ctx.measureText(this.value);
            var width = metrics.width;
            var height = metrics.height;
            // console.log(metrics.actualBoundingBoxAscent);
            // текст центрований
            this.ctx.strokeText(
                this.value,
                this.position_x+this.width/2-width/2,
                this.position_y+this.height/2+metrics.actualBoundingBoxAscent/2,
                this.maxWidthPixels
                );
        }
        }
    }

    click(x, y) {
        if (this.type != "empty" & this.is_active == true) {
            if (x >= this.position_x & x <= this.position_x+this.width & y >= this.position_y & y <= this.position_y+this.width) {
                this.ctx.fillStyle = this.clicked_color; //"rgb(123, 10, 50)";
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

    toJSON() {
        return {
            "is_active": this.is_active,
            "is_clicked": this.is_clicked,
            "index": this.ind,
            "display_value": this.value,
            "is_hit": this.is_hit
        }
    }
}

export class ChooseButton extends BaseButton{
    constructor(pos_x, pos_y, width, height, radius, ctx, ind){
    super(pos_x, pos_y, width, height, ctx);
    this.ind = ind;
    this.value = "";
    this.radius = radius;
    this.startAngle = 0;
    this.endAngle = Math.PI*2;
    this.counter = 0;
    this.color = "rgb(180, 180, 180)";
    this.clicked_color = "rgb(123, 10, 50)";
    this.hovered_color = "rgb(0, 256, 0)";
    this.missed_color = "rgb(0, 0, 0)"
    this.hitted_color = "rgb(255, 255, 0)"
    this.stroke_style = "rgb(0, 0, 256)";
    this.shrift = "20px Impact";
    }

    roundChecker(x, y){
        if (this.radius >= Math.sqrt(Math.pow(this.position_x-x, 2) + Math.pow(this.position_y-y, 2))){
            return true
        };
        return false
    };

    draw(){
        let color = 0;

        this.ctx.beginPath();
        this.ctx.arc(this.position_x, this.position_y, this.radius, this.startAngle, this.endAngle)
        if (this.is_hit == false) {

        }

        if (this.is_clicked == false) {
            color = this.color;
        } else if (this.is_clicked == true) {
            color = this.clicked_color;
        } else if (this.is)

        if (this.ishovered == true) {
            color = this.hovered_color;
        };
        this.ctx.fillStyle = color;
        this.ctx.fill()
        var metrics = this.ctx.measureText(this.counter);
        var width = metrics.width;
        var height = metrics.height;
        this.ctx.strokeStyle = this.stroke_style;
        this.ctx.font = this.shrift;
        this.ctx.strokeText(
            this.counter,
            this.position_x-width/2,
            this.position_y+metrics.actualBoundingBoxAscent/2,
            this.maxWidthPixels
        );
    }

    click(x, y){
        if (this.roundChecker(x, y)){
        this.is_clicked = true;
        return true
        };
    };

    hover(x, y){
        if (this.roundChecker(x, y)){
            this.ishovered = true;
            return true
        };
        this.ishovered = false;
        return false
    };
};

