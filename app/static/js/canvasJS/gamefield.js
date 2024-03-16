import Button from "./button.js";

export default class gameField {
    constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.field1 = new playerGameField(10, 10, 40, 40, 10, ctx)
    this.field2 = new playerGameField(600, 10, 40, 40, 10, ctx)
    }

    fieldInit() {
        this.field1.fieldInit()
        this.field2.fieldInit()
        this.draw()
    }

    draw() {
        this.field1.fieldDraw()
        this.field2.fieldDraw()
    }

    onLeftMouseButtonDown(event) {
        this.field2.clickCheker(event);
        this.field1.clickCheker(event);
    }
}

export class playerGameField {
    constructor(startx, starty, width, height, amount, ctx) {
        this.startx = startx
        this.starty = starty
        this.width = width
        this.height = height
        this.amount = amount
        this.ctx = ctx
        this.button_list = []
    }

    fieldInit() {
        let x = 0
        let y = 0
        for (let i = 0; i < this.amount*this.amount; i++) {
            this.button_list.push(new Button(this.startx+x, this.starty+y, this.width, this.height, this.ctx, i))
            x += 50
            if (Number.isInteger((i+1)/this.amount) & i != 0) {
                y += 50
                x = 0
            }
        }
    }

    fieldDraw() {
       for (let i = 0; i < this.button_list.length; i++) {
            this.button_list[i].draw()
         }
    }

    clickCheker(event) {
        let x = event.clientX;
        let y = event.clientY;

        for (let i = 0; i < this.button_list.length; i++) {
           this.button_list[i].click(x, y)
        }
    }
}

