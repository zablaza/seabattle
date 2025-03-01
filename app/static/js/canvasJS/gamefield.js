import {Button, ChooseButton} from "./button.js";

export default class gameField {
    constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.field1 = new playerGameField(10, 10, 40, 40, 11, ctx)
    this.field2 = new playerGameField(600, 10, 40, 40, 11, ctx)
    this.sbl = this.field1.button_list // shipbuttonlist
    this.button_list_for_python = []
    }

    fieldInit() {
        this.field1.fieldInit()
        this.field2.fieldInit()
        this.field1.marker()
        this.field2.marker()
    }

    draw() {
        this.field1.fieldDraw()
        this.field2.fieldDraw()
    }

    onLeftMouseButtonDown(event) {
        // call methods that do logic of clicks for all elements on gamefield

        // Forgot the reason why we use this method here (basically it has the same idea as chooserClickCeker()
//        this.field1.clickCheker(event, this.shipbutton, this.shipAligment, this.chooser, this.shipbuttonlist);
    }

    onMouseHover(event) {
        /*if (this.shipbutton.is_clicked == true) {
        this.chooser = 2
        }*/
        this.field2.hoverCheker(event, this.chooser, this.shipbutton, this.shipAligment);
        this.field1.hoverCheker(event, this.chooser, this.shipbutton, this.shipAligment);
    }


}

export class playerGameField {
    constructor(startx, starty, width, height, amount, ctx) {
        this.ship_amount = 23
        this.startx = startx
        this.starty = starty
        this.width = width
        this.height = height
        this.amount = amount
        this.ctx = ctx
        this.button_list = []
        this.ship_dictionary = {"1": 2, "2": 3, "3": 2, "4": 1, "5": 1}
        this.ship_cords = {
            "1": [
                [],  // empty_index = 0
                []  // empty_index = 1
            ],
            "2": [
                [],
                [],
                []
            ],
            "3": [[], []],
            "4": [[]],
            "5": [[]]
        }
        this.current_step = []


         /*{"1": [[2], [15]],
          "2": [[4, 5], [15, 25]],
          "3": [[7,8,9], [50,60,70]],
          "4": [[45,46,47,48], [1,2,3,4]],
          "5": [[1, 2, 3, 4, 5]]}*/
    }

    fieldInit() {
        let x = 0
        let y = 0
        let step = 41
        for (let i = 0; i < this.amount*this.amount; i++) {

            this.button_list.push(new Button(this.startx+x, this.starty+y, this.width, this.height, this.ctx, i))
            x += step
            if (Number.isInteger((i+1)/this.amount) & i != 0) {
                y += step
                x = 0
            }
        }
        let field_x = this.amount*(this.width+(step-this.width))
        let field_y = this.amount*(this.height+(step-this.height))

    }

    fieldDraw() {
       for (let i = 0; i < this.button_list.length; i++) {
            this.button_list[i].draw()
         }
    }

    clickCheker(event, shipbutton, shipAligment, chooser, shipbuttonlist) {
        let x = event.clientX;
        let y = event.clientY;
        for (let i = 0; i < this.button_list.length; i++) {

            if (this.button_list[i].click(x, y) == true & this.button_list[i].is_active == true & this.ship_dictionary[String(chooser)] > 0) {



                if (shipAligment == 0 & i-11*chooser > 0) {
                   let is_allowed = true
                   for (let b = 0; b < chooser; b++){
                       if (this.button_list[i-b*11].is_active == false){
                           is_allowed = true
                           break
                       }
                   }
                   if (is_allowed == true){
                       for (let a = 0; a < chooser; a++) {
                           this.button_list[i-a*11].is_clicked = true;
                           this.current_step = i-a*11
                           this.button_list[i-a*11].is_active = false;
                           this.button_list[i-a*11].ishovered = false;
                           this.button_list[(i-a*11)-1].is_active = false;
                           this.button_list[(i-a*11)-12].is_active = false;
                           this.button_list[(i-a*11)-11].is_active = false;
                           this.button_list[(i-a*11)-10].is_active = false;
                           if (this.button_list[i+12]) {
                           this.button_list[(i-a*11)+1].is_active = false;
                           this.button_list[(i-a*11)+12].is_active = false;
                           this.button_list[(i-a*11)+11].is_active = false;
                           this.button_list[(i-a*11)+10].is_active = false;
                           };
                       }
                      this.ship_dictionary[String(chooser)] -= 1;
                      shipbuttonlist[String(chooser-1)].counter = this.ship_dictionary[String(chooser)];
                      $.ajax({
                            type: "POST",
                            url: "{% url '' %}",
                            data: {
                            "state": button_list,
                            csrfmiddlewaretoken: '{{ csrf_token }}'}})

                   }
                }


                else if (shipAligment == 1) {
                   let is_allowed = true
                   for (let b = 0; b < chooser; b++){
                       if (this.button_list[i-b].is_active == false){
                           is_allowed = true
                           break
                       }
                   }
                   if (is_allowed == true){
                       for (let a = 0; a < chooser; a++) {
                           this.button_list[i-a].is_clicked = true
                           this.current_step = i-a
                           this.button_list[i-a].is_active = false
                           this.button_list[i-a].ishovered = false
                           this.button_list[(i-a)-1].is_active = false
                           this.button_list[(i-a)-12].is_active = false
                           this.button_list[(i-a)-11].is_active = false
                           this.button_list[(i-a)-10].is_active = false
                           if (this.button_list[i+12]) {
                           this.button_list[(i-a)+1].is_active = false
                           this.button_list[(i-a)+12].is_active = false
                           this.button_list[(i-a)+11].is_active = false
                           this.button_list[(i-a)+10].is_active = false
                           }
                       }
                       this.ship_dictionary[String(chooser)] -= 1;
                      shipbuttonlist[String(chooser-1)].counter = this.ship_dictionary[String(chooser)];
                   }
                }
            }
        }
    }

    hoverCheker(event, chooser, shipbutton, shipAligment) {
        let x = event.clientX;
        let y = event.clientY;

        for (let i = 0; i < this.button_list.length; i++) {
            if (this.button_list[i].hover(x, y)) {
                if (shipAligment == 0){
                for (let a = 0; a < chooser; a++) {
                    if (this.button_list[i-a*11].is_active == true){
                        this.button_list[i-a*11].ishovered = true
                    }
                    else {
                        break
                    }
                }
                }
                if (shipAligment == 1){
                for (let a = 0; a < chooser; a++) {
                    if (this.button_list[i-a].is_active == true){
                        this.button_list[i-a].ishovered = true
                    }
                    else {
                        break
                    }
                }
                }
            }
        }
    }
    marker() {
    this.button_list[0].type = 'empty'
    this.button_list[0].is_active = false
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    for (let i = 0; i < this.amount; i++) {
        if (i > 0 & i < this.amount) {
            this.button_list[i].is_active = false
            this.button_list[this.amount*i].is_active = false
            this.button_list[i].type = 'number'
            this.button_list[i].value = String(i)
            this.button_list[this.amount*i].type = 'letter'
            this.button_list[this.amount*i].value = alphabet[i-1]
        }

    }
    }

}

