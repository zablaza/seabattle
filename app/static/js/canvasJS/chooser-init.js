import {Button, ChooseButton} from "./button.js";

export default class ShipPlacement {
    constructor(canvas, ctx, gamefieldObject) {

        this.canvas = canvas
        this.ctx = ctx

        this.shipAligment = 1
        this.choosernew = new ChooseButton(555, 555, 40, 40, this.ctx, 0)
        this.chooserButtons = []

        this.shipbuttonlist = gamefieldObject.field1.button_list
        this.ship_cords = gamefieldObject.field1.ship_cords
        this.chooser = 1  // deck length
        this.ship_dictionary = gamefieldObject.field1.ship_dictionary

        this.empty_index = 0

        this.current_step = gamefieldObject.field1.current_step
        this.iteration_number_i = 0
        this.iteration_number_a = 0
        this.aligment_number_b = 0

        this.ship_amount = gamefieldObject.field1.ship_amount
        this.reset_button = new Button(350, 475, 100, 50, this.ctx, 123)
        this.start_button = new Button(470, 475, 100, 50, this.ctx, 123)
        this.reset_button.color = "rgb(180, 10, 10)"
        this.reset_button.value = "reset"
        this.reset_button.stroke_style = "rgb(255, 255, 255)"
        this.start_button.color = "rgb(180, 10, 10)"
        this.start_button.value = "start"
        this.start_button.stroke_style = "rgb(255, 255, 255)"



    }

    fieldStart() {
        let x = event.clientX;
        let y = event.clientY;
        if (this.start_button.click(x, y) && this.ship_amount == 0){
            for (let i=0; i<this.shipbuttonlist.length; i++) {
                this.shipbuttonlist[i].is_active = false
            }
            return 1
        }
        return 0
    }

    fieldReset() {
        let x = event.clientX;
        let y = event.clientY;
        if (this.reset_button.click(x, y) === true){
            this.ship_amount = 23
            console.log(this.ship_amount)
            for (let i=0; i < this.shipbuttonlist.length; i++) {
                if (this.shipbuttonlist[i].value == "") {
                    this.shipbuttonlist[i].is_clicked = false
                    this.shipbuttonlist[i].is_active = true
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
                    this.ship_dictionary = {"1": 2, "2": 3, "3": 2, "4": 1, "5": 1}
                    console.log(this.chooserButtons)
                }
            }
            return true
        }

    }

    resetHover() {
        let x = event.clientX;
        let y = event.clientY;
        this.reset_button.hover(x, y)
    }

    startHover() {
        let x = event.clientX;
        let y = event.clientY;
        this.start_button.hover(x, y)
    }

    chooserInit(startx=150, starty=500) {
        let x = 0;
        let buttonsy = 0;
        let radius = 20;
        let step = radius*2+1;
        for (let i=0; i<5; i++) {
            let cho = new ChooseButton(startx+x, starty, 90, 90, radius, this.ctx, 0);
            cho.color = "rgb(123, 200, 150)";
            cho.type = 'ship_chooser';
            cho.counter = this.ship_dictionary[String(i+1)];
            this.chooserButtons.push(cho);
            x += step;
        }
        for (let a=0; a<5; a++){
            for (let b=0; b<=a; b++){
                let val = new Button(startx-radius/2, starty+buttonsy+radius+3, radius, radius, this.ctx, 0);
                val.is_active = false;
                val.color = "rgb(123, 10, 50)";
                this.chooserButtons.push(val); // pixels between center of round and start coord of square
                buttonsy += radius+1; // pixels between squares start cords
            }
            buttonsy = 0;
            startx+=radius*2+1;
        }

    }

    chooserHover(event) {
        let x = event.clientX;
        let y = event.clientY;
        for (let i=0; i<5; i++) {
            this.chooserButtons[i].hover(x, y)
        }
    }

    chooserDraw() {
        for (let i=0; i<this.chooserButtons.length; i++) {
            this.chooserButtons[i].draw()
        }
        this.reset_button.draw()
        this.start_button.draw()
    }

    findVacantPlace() {
        for (let c = 0; c < this.ship_cords[String(this.chooser)].length; c++) {
           if (this.ship_cords[String(this.chooser)][c].length == 0) {
               this.empty_index = c;
               console.log()
               break;
           }
        }
    }

    setForbiddenZoneAroundPlacedShip(i, a, b) {
        if (typeof i === 'number' && typeof a === 'number' && typeof b === 'number') {
            // One deck at time
            for (let a = 0; a < this.chooser; a++) {
                this.ship_cords[String(this.chooser)][this.empty_index].push(i-a*b);

                this.shipbuttonlist[i-a*b].is_clicked = true;
                //creating non clickable buttons around the clicked button
                this.shipbuttonlist[i-a*b].ishovered = false;
                this.shipbuttonlist[i-a*b].is_active = false;
                this.shipbuttonlist[(i-a*b)-1].is_active = false;
                this.shipbuttonlist[(i-a*b)-12].is_active = false;
                this.shipbuttonlist[(i-a*b)-11].is_active = false;
                this.shipbuttonlist[(i-a*b)-10].is_active = false;
                    // check is there buttons under the clicked button
                if (this.shipbuttonlist[i+12]) {
                   this.shipbuttonlist[(i-a*b)+1].is_active = false;
                   this.shipbuttonlist[(i-a*b)+12].is_active = false;
                   this.shipbuttonlist[(i-a*b)+11].is_active = false;
                   this.shipbuttonlist[(i-a*b)+10].is_active = false;
        //           console.log(223123)
                };
             };


        }
        else {
            console.log("no a b")
        }

        //}
    }

    shipLength(x, y) {
        //
         for (let i=0; i<5; i++) {
                if (this.chooserButtons[i].click(x, y)) {
                    for (let a=0; a<5; a++) {
                        this.chooserButtons[a].is_clicked = false
                    }
                    this.chooserButtons[i].is_clicked = true
                    this.chooser = i+1 // reassign amount of shipdecks
//                    console.log(this.chooser)
                }
            }

    }

    chooserClickCheker(event) {
        let x = event.clientX;
        let y = event.clientY;
        this.current_step.length = 0;
        // checking click on chooserbutton, to check what ship must be placed
        /*for (let i=0; i<5; i++) {
            if (this.chooserButtons[i].click(x, y)) {
                for (let a=0; a<5; a++) {
                    this.chooserButtons[a].is_clicked = false
                }
                this.chooserButtons[i].is_clicked = true
                this.chooser = i+1 // reassign amount of shipdecks
            }
        }*/
        // ship length
        this.shipLength(x, y)
        for (let i = 0; i < this.shipbuttonlist.length; i++) {
            this.iteration_number_i = i
            if (
                    (this.shipbuttonlist[i].click(x, y) == true)
                    && (this.shipbuttonlist[i].is_active == true)
                    && (this.ship_dictionary[String(this.chooser)] > 0)
            ) {
                    //  checking if we can put ship vertical
                    if (this.shipAligment == 0 && i-11*this.chooser > 0) {
                       let is_allowed = true;
                       // forbid ship placement if ship is going to be placed over inactive tile (non playable)
                       for (let b = 0; b < this.chooser; b++){
                           if (this.shipbuttonlist[i-b*11].is_active == false){
                               is_allowed = false;
                               return false
                           }
                       }

                       if (is_allowed == true){
                           this.aligment_number_b = 11
                           this.findVacantPlace();
                           //vertical logic
                           for (let a = 0; a < this.chooser; a++) {
                               // memorized ship cord
                               this.iteration_number_a = a
                               //this.setForbiddenZoneAroundPlacedShip(i, a, 11);
                               this.current_step.push(i-a*11)
                           }
                          // reduce amount of ships of selected length
                          this.ship_dictionary[String(this.chooser)] -= 1;
                          this.shipbuttonlist[String(this.chooser-1)].counter = this.ship_dictionary[String(this.chooser)];
                          this.ship_amount -= this.chooser
                          return true

                       }
                    }


                    else if (this.shipAligment == 1) {
                       let is_allowed = true;
                       for (let b = 0; b < this.chooser; b++){
                           if (this.shipbuttonlist[i-b].is_active == false){
                               is_allowed = false;
                               return false
                           }
                       }
                       if (is_allowed == true){
                           // searching empty cell for adding cords
                           this.aligment_number_b = 1
                           this.findVacantPlace();
                           // horizontal logic
                           for (let a = 0; a < this.chooser; a++) {
                               this.iteration_number_a = a
                               //this.setForbiddenZoneAroundPlacedShip(i, a, 1);
                               this.current_step.push(i-a*1)
                           }
                           this.ship_dictionary[String(this.chooser)] -= 1;
                           this.shipbuttonlist[String(this.chooser-1)].counter = this.ship_dictionary[String(this.chooser)];
                           this.ship_amount -= this.chooser
                           return true
                       }
                    }
                    this.chooserButtons[this.chooser-1].counter-=1
                }
            }
        }

    chooserClickCheker2(event) {
    // this function was made for sending errors on backend
        this.current_step.length = 0;
        let x = event.clientX;
        let y = event.clientY;
        this.shipLength(x, y)
//        console.log(this.shipbuttonlist.length)
        for (let i = 0; i < this.shipbuttonlist.length; i++) {
            this.iteration_number_i = i
            if (this.shipAligment == 0 && i-11*this.chooser > 0) {

               let is_allowed = true;

               if (is_allowed == true){
                  this.findVacantPlace();
                  for (let a = 0; a < this.chooser; a++) {
                       // memorized ship cord
                       this.iteration_number_a = a
                       this.current_step.push(i-a*11)
                   }
                  //this.setForbiddenZoneAroundPlacedShip(11);
                  this.ship_dictionary[String(this.chooser)] -= 1;
                  this.shipbuttonlist[String(this.chooser-1)].counter = this.ship_dictionary[String(this.chooser)];
                  return true;

               }
            }

            else if (this.shipAligment == 1) {
               let is_allowed = true;

               if (is_allowed == true){
                   this.findVacantPlace();
                   for (let a = 0; a < this.chooser; a++) {
                       // memorized ship cord
                       this.iteration_number_a = a
                       this.current_step.push(i-a*1)
                   }
                   //this.setForbiddenZoneAroundPlacedShip(1);
                   this.ship_dictionary[String(this.chooser)] -= 1;
                   this.shipbuttonlist[String(this.chooser-1)].counter = this.ship_dictionary[String(this.chooser)];
                   return true;
               }
            }
            this.chooserButtons[this.chooser-1].counter-=1;

        }
        return false;
    }


    changeAligment() {
    // 0-vertical up 1-horizontal left
        if (this.shipAligment == 0) {
            this.shipAligment = 1
        }
        else if (this.shipAligment == 1) {
            this.shipAligment = 0
            }
    }

}